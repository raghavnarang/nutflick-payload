import { sql } from "@vercel/postgres";
import type {
  Adapter,
  AdapterUser,
  VerificationToken,
  AdapterSession,
} from "@auth/core/adapters";

export default function VercelAdapter(): Adapter {
  return {
    async createVerificationToken(
      verificationToken: VerificationToken
    ): Promise<VerificationToken> {
      const { identifier, expires, token } = verificationToken;
      const query = `
        INSERT INTO "VerificationToken" ( identifier, expires, token ) 
        VALUES ($1, $2, $3) RETURNING identifier, expires, token
        `;

      const client = await sql.connect();
      try {
        const result = await client.query(query, [identifier, expires, token]);
        client.release();
        return result.rowCount !== 0 ? result.rows[0] : null;
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async useVerificationToken({
      identifier,
      token,
    }: {
      identifier: string;
      token: string;
    }): Promise<VerificationToken> {
      const query = `delete from "VerificationToken"
      where identifier = $1 and token = $2
      RETURNING identifier, expires, token`;

      const client = await sql.connect();
      try {
        const result = await client.query(query, [identifier, token]);
        client.release();
        return result.rowCount !== 0 ? result.rows[0] : null;
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async createUser(user: Omit<AdapterUser, "id">) {
      const { name, email, emailVerified, image } = user;
      const query = `
        INSERT INTO "User" (name, email, "emailVerified", image) 
        VALUES ($1, $2, $3, $4) 
        RETURNING id, name, email, "emailVerified", image`;

      const client = await sql.connect();
      try {
        const result = await client.query(query, [
          name,
          email,
          emailVerified,
          image,
        ]);
        client.release();
        return result.rows[0];
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async getUser(id) {
      const query = `select * from "User" where id = $1`;
      const client = await sql.connect();
      try {
        const result = await client.query(query, [id]);
        client.release();
        return result.rowCount === 0 ? null : result.rows[0];
      } catch (e) {
        client.release();
        return null;
      }
    },
    async getUserByEmail(email) {
      const query = `select * from "User" where email = $1`;
      const client = await sql.connect();
      try {
        const result = await client.query(query, [email]);
        client.release();
        return result.rowCount !== 0 ? result.rows[0] : null;
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async getUserByAccount({
      providerAccountId,
      provider,
    }): Promise<AdapterUser | null> {
      const query = `
          select u.* from "User" u join "Account" a on u.id = a."userId"
          where
          a.provider = $1
          and
          a."providerAccountId" = $2`;
      const client = await sql.connect();
      try {
        const result = await client.query(query, [provider, providerAccountId]);
        client.release();
        return result.rowCount !== 0 ? result.rows[0] : null;
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async updateUser(user: Partial<AdapterUser>): Promise<AdapterUser> {
      const fetchSql = `select * from "User" where id = $1`;
      const updateSql = `
        UPDATE "User" set
        name = $2, email = $3, "emailVerified" = $4, image = $5
        where id = $1
        RETURNING name, id, email, "emailVerified", image
      `;

      const client = await sql.connect();

      try {
        const query1 = await client.query(fetchSql, [user.id]);
        const oldUser = query1.rows[0];

        const newUser = {
          ...oldUser,
          ...user,
        };

        const { id, name, email, emailVerified, image } = newUser;

        const query2 = await client.query(updateSql, [
          id,
          name,
          email,
          emailVerified,
          image,
        ]);
        client.release();
        return query2.rows[0];
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async linkAccount(account) {
      const query = `
      insert into "Account"
      (
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type
      )
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      returning
        id,
        "userId",
        provider,
        type,
        "providerAccountId",
        access_token,
        expires_at,
        refresh_token,
        id_token,
        scope,
        session_state,
        token_type
      `;

      const params = [
        account.userId,
        account.provider,
        account.type,
        account.providerAccountId,
        account.access_token,
        account.expires_at,
        account.refresh_token,
        account.id_token,
        account.scope,
        account.session_state,
        account.token_type,
      ];

      const client = await sql.connect();
      try {
        const result = await client.query(query, params);
        client.release();
        return result.rows[0];
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      if (userId === undefined) {
        throw Error(`userId is undef in createSession`);
      }

      const query = `insert into "Session" ("userId", expires, "sessionToken")
      values ($1, $2, $3)
      RETURNING id, "sessionToken", "userId", expires`;

      const client = await sql.connect();
      try {
        const result = await client.query(query, [
          userId,
          expires,
          sessionToken,
        ]);
        client.release();
        return result.rows[0];
      } catch (e) {
        client.release();
        throw e;
      }
    },

    async getSessionAndUser(sessionToken: string | undefined): Promise<{
      session: AdapterSession;
      user: AdapterUser;
    } | null> {
      if (sessionToken === undefined) {
        return null;
      }
      const client = await sql.connect();
      try {
        const result1 = await client.query(
          `select * from "Session" where "sessionToken" = $1`,
          [sessionToken]
        );
        if (result1.rowCount === 0) {
          client.release();
          return null;
        }
        let session: AdapterSession = result1.rows[0];

        const result2 = await client.query(
          `select * from "User" where id = $1`,
          [session.userId]
        );
        client.release();
        if (result2.rowCount === 0) {
          return null;
        }
        const user = result2.rows[0];
        return {
          session,
          user,
        };
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async updateSession(
      session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ): Promise<AdapterSession | null | undefined> {
      const { sessionToken } = session;
      const client = await sql.connect();
      try {
        const result1 = await client.query(
          `select * from "Session" where "sessionToken" = $1`,
          [sessionToken]
        );
        if (result1.rowCount === 0) {
          client.release();
          return null;
        }
        const originalSession: AdapterSession = result1.rows[0];

        const newSession: AdapterSession = {
          ...originalSession,
          ...session,
        };
        const updateSql = `
        UPDATE "Session" set
        expires = $2
        where "sessionToken" = $1
        returning id, "sessionToken", "userId", expires
        `;
        const result = await client.query(updateSql, [
          newSession.sessionToken,
          newSession.expires,
        ]);
        client.release();
        return result.rows[0];
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async deleteSession(sessionToken) {
      const query = `delete from "Session" where "sessionToken" = $1`;
      const client = await sql.connect();
      try {
        await client.query(query, [sessionToken]);
        client.release();
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async unlinkAccount(partialAccount) {
      const { provider, providerAccountId } = partialAccount;
      const client = await sql.connect();
      try {
        const query = `delete from "Account" where "providerAccountId" = $1 and provider = $2`;
        await client.query(query, [providerAccountId, provider]);
        client.release();
      } catch (e) {
        client.release();
        throw e;
      }
    },
    async deleteUser(userId: string) {
      const client = await sql.connect();
      try {
        await client.query(`delete from "User" where id = $1`, [userId]);
        await client.query(`delete from "Session" where "userId" = $1`, [
          userId,
        ]);
        await client.query(`delete from "Account" where "userId" = $1`, [
          userId,
        ]);
        client.release();
      } catch (e) {
        client.release();
        throw e;
      }
    },
  };
}
