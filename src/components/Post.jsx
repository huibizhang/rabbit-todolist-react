import clsx from "clsx";

const Post = ({ id, title, content, tags, open }) => {
  const [edit, setMode] = open;

  return (
    <div
      className="flex w-full flex-col overflow-hidden rounded-md border bg-white dark:border-gray-600 dark:bg-gray-700"
      datakey={id}
      onClick={() => {
        edit(id);
        setMode("edit");
      }}
    >
      <div
        className={clsx([
          "border-b border-gray-50 p-3 text-xl font-bold dark:border-gray-600 dark:text-gray-300",
          !title && "hidden",
        ])}
      >
        {title}
      </div>
      <div className="p-3 dark:text-gray-400">{content}</div>
      {tags ? (
        <div className="flex space-x-2 px-3 pb-2 text-xs">
          {tags.map((tag) => {
            return (
              <div
                className="rounded-lg bg-gray-100 px-2.5 py-1 dark:bg-gray-600 dark:text-gray-400"
                key={`${id}-${tag}`}
              >
                {tag}
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Post;
