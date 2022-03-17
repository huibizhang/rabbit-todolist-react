import clsx from "clsx";

const Modal = (props) => {
  const { title = "", content = "", openned = false } = props;

  const closing = () => {
    const [setModalOpened, setMode] = props.closed;
    setModalOpened(false);
    setMode("create");
  };

  return (
    <div
      className={clsx([
        "absolute top-0 z-10 flex h-screen w-screen items-center justify-center p-2",
        !openned && "pointer-events-none",
      ])}
    >
      {/* Overlay */}
      <div
        className={clsx([
          "absolute h-full w-full bg-black/50 transition-all duration-200 dark:bg-black/70",
          openned ? "opacity-100" : "opacity-0",
        ])}
        onClick={closing}
      />

      {/* Window */}
      <div
        className={clsx([
          "w-10/12 overflow-hidden rounded-md bg-white transition-all duration-200 dark:bg-gray-700 sm:w-full sm:max-w-md md:max-w-xl lg:max-w-2xl",
          openned ? "scale-100" : "scale-0",
        ])}
      >
        <div className="h-10 w-full border-b dark:border-gray-600">
          <div className="flex h-full w-full items-center justify-center font-bold dark:text-gray-300">
            {title}
          </div>
          <div className="absolute right-0 top-0 h-10 p-1.5">
            <div
              className="flex aspect-square h-full items-center justify-center rounded-lg border p-1 text-gray-700 hover:bg-gray-100 active:bg-gray-200 dark:border-gray-500 dark:text-gray-400 dark:hover:bg-gray-600 dark:active:bg-gray-800"
              onClick={closing}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="w-full">
          {props.children ? (
            props.children
          ) : (
            <div className="p-3">{content}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
