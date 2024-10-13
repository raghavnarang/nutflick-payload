import {
  useState,
  type FC,
  type RefObject,
  useRef,
  MouseEventHandler,
} from "react";
import { useFormStatus } from "react-dom";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import Button from "../button";
import type { ButtonProps } from "../button";

const siteKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!;

export interface CaptchaSubmitButtonProps extends ButtonProps {
  formRef: RefObject<HTMLFormElement>;
}

const CaptchaSubmitButton: FC<CaptchaSubmitButtonProps> = ({
  formRef,
  ...buttonProps
}) => {
  const { pending } = useFormStatus();
  const [isCaptchaVerified, setCaptchaVerified] = useState(false);

  const captchaRef = useRef<HCaptcha>(null);

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    buttonProps.onClick?.(e);
    const isFormValid = formRef.current?.reportValidity();
    if (!isFormValid) {
      e.preventDefault();
      return;
    }

    if (!isCaptchaVerified) {
      e.preventDefault();
      try {
        const result = await captchaRef.current?.execute({ async: true });
        if (result?.response) {
          formRef.current?.requestSubmit();
        }
      } catch (err) {
        setCaptchaVerified(false);
      }
    }
  };

  const reInitCaptch = () => {
    setCaptchaVerified(false);
    captchaRef.current?.resetCaptcha();
  };

  return (
    <>
      <HCaptcha
        ref={captchaRef}
        sitekey={siteKey}
        size="invisible"
        onVerify={(token) => setCaptchaVerified(!!token)}
        onError={reInitCaptch}
        onExpire={reInitCaptch}
      />
      <Button
        {...buttonProps}
        type="submit"
        disabled={buttonProps.disabled || pending}
        onClick={onSubmit}
      >
        {buttonProps.children}
      </Button>
    </>
  );
};

export default CaptchaSubmitButton;
