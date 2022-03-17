import clsx from "clsx";
import { useEffect, useState } from "react";

const PostCreator = (props) => {
  const {
    id,
    title = "",
    content = "",
    tags = [],
    pin = false,
    mode = "create",
    order,
  } = props;

  const [_title, setTitle] = useState("");
  const [_content, setContent] = useState("");
  const [_tags, setTags] = useState([]);
  const [_pin, setPin] = useState(false);

  const [tagEditor, setTagEditor] = useState(false);
  const [newTag, setNewTag] = useState("");

  const [addPost, updatePost] = props.save;

  useEffect(() => {
    setTitle(title);
    setContent(content);
    setTags(tags);
    setPin(pin);
    setTagEditor(false);
  }, [props]);

  const add = () => {
    addPost({
      id: idGenerator(16),
      title: _title,
      content: _content,
      pin: _pin,
      tags: _tags,
      order: 0,
    });
  };

  const edit = () => {
    updatePost({
      id: id,
      title: _title,
      content: _content,
      pin: _pin,
      tags: _tags,
      order: order,
    });
  };

  const addTag = () => {
    if (newTag) {
      setTags([..._tags, newTag]);
      setNewTag("");
    }
  };

  const removeTag = (delTag) => {
    if (delTag) {
      setTags(_tags.filter((tag) => tag !== delTag));
    } else {
      setTags(_tags.slice(0, _tags.length - 1));
    }
  };

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };
  const idGenerator = (length) => {
    const key = [
      "abcdefghijklmnopqrstuvwxyz",
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      "0123456789",
    ].join("");

    var id = "";
    for (let i = 0; i < length; i++) {
      id += key[getRandomInt(key.length)];
    }

    return id;
  };

  return (
    <div className="w-full">
      <div className="w-full border-b dark:border-gray-500">
        <input
          className="w-full p-3 font-bold outline-none dark:bg-gray-700 dark:text-gray-200"
          placeholder="輸入標題..."
          value={_title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex h-[75vh] flex-col">
        <textarea
          placeholder="輸入記事..."
          className="w-full flex-1 resize-none overflow-y-auto p-3 outline-none dark:bg-gray-700 dark:text-gray-300"
          value={_content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div
          className={clsx([
            "flex-none overflow-hidden transition-all dark:border-gray-500",
            tagEditor ? "max-h-full border-t" : "max-h-0  border-t-0",
          ])}
        >
          <div className="flex flex-wrap items-center gap-2 p-3 text-xs">
            {_tags.map((tag) => {
              return (
                <div
                  className="flex h-6 flex-none cursor-pointer items-center rounded-lg bg-gray-100 px-2.5 dark:bg-gray-600 dark:text-gray-400"
                  key={`${id}-${tag}`}
                  onClick={() => removeTag(tag)}
                >
                  {tag}
                </div>
              );
            })}
            <input
              className="h-6 outline-none dark:bg-transparent dark:caret-gray-300"
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addTag();
                } else if (e.key === "Backspace" && newTag === "") {
                  removeTag("");
                }
              }}
            />
          </div>
        </div>
        <div className="flex w-full flex-none justify-between border-t p-3 dark:border-gray-500">
          <div className="flex h-full space-x-2">
            <div
              className={clsx([
                "flex aspect-square h-full items-center justify-center rounded-md border transition-all dark:border-gray-600",
                _pin
                  ? "bg-gray-300 text-blue-600 dark:bg-gray-800 dark:text-blue-500"
                  : "bg-white text-gray-500 dark:bg-gray-700 dark:text-gray-400",
              ])}
              onClick={() => setPin(!_pin)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.729,4.271c-0.389-0.391-1.021-0.393-1.414-0.004c-0.104,0.104-0.176,0.227-0.225,0.355  c-0.832,1.736-1.748,2.715-2.904,3.293C10.889,8.555,9.4,9,7,9C6.87,9,6.74,9.025,6.618,9.076C6.373,9.178,6.179,9.373,6.077,9.617  c-0.101,0.244-0.101,0.52,0,0.764c0.051,0.123,0.124,0.234,0.217,0.326l3.243,3.243L5,20l6.05-4.537l3.242,3.242  c0.092,0.094,0.203,0.166,0.326,0.217C14.74,18.973,14.87,19,15,19s0.26-0.027,0.382-0.078c0.245-0.102,0.44-0.295,0.541-0.541  C15.974,18.26,16,18.129,16,18c0-2.4,0.444-3.889,1.083-5.166c0.577-1.156,1.556-2.072,3.293-2.904  c0.129-0.049,0.251-0.121,0.354-0.225c0.389-0.393,0.387-1.025-0.004-1.414L16.729,4.271z" />
              </svg>
            </div>
            <div
              className={clsx(
                "flex aspect-square h-full items-center justify-center rounded-md border transition-all dark:border-gray-600",
                [
                  tagEditor
                    ? "bg-gray-300 text-blue-600 dark:bg-gray-800 dark:text-blue-500"
                    : "bg-white text-gray-500 dark:bg-gray-700 dark:text-gray-400",
                ]
              )}
              onClick={() => setTagEditor(!tagEditor)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button
            className={clsx([
              "rounded-md bg-blue-800 px-4 py-1.5 font-bold text-white transition-all hover:bg-blue-700 active:bg-blue-900 dark:bg-blue-600 dark:text-gray-200",
              "disabled:bg-gray-400 dark:disabled:bg-gray-600 dark:disabled:text-gray-500",
            ])}
            disabled={_content.length === 0}
            onClick={mode === "create" ? add : edit}
          >
            {mode === "create" ? "新增" : "儲存"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCreator;
