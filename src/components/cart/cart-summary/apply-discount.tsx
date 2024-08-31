const ApplyDiscount = () => {
  return (
    <form className="w-full flex items-center">
      <div className="flex w-full">
      <input
        className="text-sm px-3 py-2 border border-solid border-gray-300 focus:border-gray-400 outline-none rounded-sm w-full mr-5 disabled:opacity-50"
        type="text"
        name="code"
        placeholder="Discount Code"
        required
      />
      <button
        type="submit"
        className="rounded-sm text-sm bg-gray-200 text-gray-700 px-3 py-2 hover:bg-gray-30æ0 disabled:hover:bg-gray-200 transition-colors disabled:opacity-50"
      >
        Apply
      </button>
    </div>
    </form>
  );
};

export default ApplyDiscount;
