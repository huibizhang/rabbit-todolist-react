import clsx from "clsx";

const FloatButton = (props) => {
  return (
    <div
      className={clsx([
        "absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full border bg-white text-blue-600 shadow-md dark:bg-gray-400",
        "transition-all hover:scale-105 hover:bg-gray-50 active:scale-90 dark:hover:bg-gray-300",
      ])}
      onClick={() => props.floatButtonClicked()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="3"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </div>
  );
};

export default FloatButton;
