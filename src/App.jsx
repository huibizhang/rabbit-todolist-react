import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import Post from "./components/Post";
import FloatButton from "./components/FloatButton";
import Modal from "./components/Modal";
import PostCreator from "./components/PostCreator";
import Drawer from "./components/Drawer";

import Sortable from "sortablejs";

function App() {
  var pinned, unpinned;
  const [modalOpened, setModalOpened] = useState(false);
  const [drawerOpened, setDrawerOpened] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [todos, setTodos] = useState([]);
  const [mode, setMode] = useState("create");
  const [editData, setEditData] = useState({});

  const save = () => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  };

  const sortableSetting = {
    animation: 150,
    // onUpdate: () => {
    //   const orderList = [];

    //   [pinned, unpinned].forEach((ref) => {
    //     for (let i = 0; i < ref.children.length; i++) {
    //       const el = ref.children[i];
    //       orderList.push(el.getAttribute("datakey"));
    //     }
    //   });

    //   orderList.forEach((el, index) => {
    //     const todo = todos.find((todo) => todo.id === el);
    //     todo.order = index;
    //   });

    //   save();
    // },
  };

  useEffect(() => {
    setTodos(
      JSON.parse(window.localStorage.getItem("todos")) ?? [
        {
          id: "EGNsW62h07mBWnK5",
          title: "第一筆紀錄",
          content: "第一筆紀錄",
          pin: true,
          order: 1,
          tags: ["測試"],
        },
        {
          id: "kAcKcTwtX5EnnffK",
          title: "",
          content: "嗨，這是 todo list",
          pin: false,
          order: 2,
          tags: ["說明"],
        },
        {
          id: "tX5EnnffkAcKcTwK",
          title: "測試1",
          content: "兔兔兔兔",
          pin: false,
          order: 3,
          tags: ["測試", "vue"],
        },
      ]
    );

    pinned = document.querySelector("#pinned");
    unpinned = document.querySelector("#unpinned");

    [pinned, unpinned].forEach((ref) => {
      Sortable.create(ref, sortableSetting);
    });
  }, []);

  const posts = {
    pins: () => {
      const datas = todos.filter((todo) => {
        if (searchText) {
          const regexp = new RegExp(searchText);
          return (
            (regexp.test(todo.title) || regexp.test(todo.content)) && todo.pin
          );
        } else {
          return todo.pin;
        }
      });
      datas.sort((a, b) => {
        return a.order - b.order;
      });
      return datas;
    },
    unpins: () => {
      const datas = todos.filter((todo) => {
        if (searchText) {
          const regexp = new RegExp(searchText);
          return (
            (regexp.test(todo.title) || regexp.test(todo.content)) && !todo.pin
          );
        } else {
          return !todo.pin;
        }
      });
      datas.sort((a, b) => {
        return a.order - b.order;
      });
      return datas;
    },
  };

  const floatButtonClicked = () => {
    setEditData({});
    setModalOpened(true);
    setMode("create");
  };

  const edit = (todoId) => {
    const [data] = todos.filter((todo) => todo.id === todoId);
    setEditData(data);
    setModalOpened(true);
  };

  const addPost = (postData) => {
    setTodos([...todos, postData]);
    setMode("create");
    setModalOpened(false);
  };

  const updatePost = (postData) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === postData.id) {
          const current = Object.assign({}, todo);
          current.title = postData.title;
          current.content = postData.content;
          current.pin = postData.pin;
          current.tags = postData.tags;
          return current;
        } else {
          return todo;
        }
      })
    );
    setMode("create");
    setModalOpened(false);
  };

  // const data = {
  //   modalOpened: false,
  //   drawerOpened: false,
  //   todos: [
  //     {
  //       id: "EGNsW62h07mBWnK5",
  //       title: "第一筆紀錄",
  //       content: "第一筆紀錄",
  //       pin: true,
  //       order: 1,
  //       tags: ["測試"],
  //     },
  //     {
  //       id: "kAcKcTwtX5EnnffK",
  //       title: "",
  //       content: "嗨，這是 todo list",
  //       pin: false,
  //       order: 2,
  //       tags: ["說明"],
  //     },
  //     {
  //       id: "tX5EnnffkAcKcTwK",
  //       title: "測試1",
  //       content: "兔兔兔兔",
  //       pin: false,
  //       order: 3,
  //       tags: ["測試", "vue"],
  //     },
  //   ],
  //   searchText: "",
  //   sortableSetting: {},
  //   editData: {},
  //   mode: "create",
  // };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden">
      <div className="relative h-12 w-full flex-none">
        <div className="flex h-full w-full items-center justify-center bg-yellow-500 text-lg font-bold text-white dark:bg-yellow-600 dark:text-gray-200">
          小。待辦
        </div>
        <div className="absolute top-0 aspect-square h-full p-1">
          <div
            className="flex aspect-square h-full items-center justify-center rounded-full text-white hover:bg-white/30 dark:text-gray-200"
            onClick={() => setDrawerOpened(true)}
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
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="flex min-h-0 flex-1 flex-col space-y-3 bg-gray-100 p-3 dark:bg-gray-900">
        <div className="relative inset-0 mx-auto flex h-10 w-full flex-none items-center transition-all sm:max-w-md">
          <input
            className="h-full w-full rounded-lg border px-2 outline-none ring-yellow-500 focus:ring-2 dark:border-gray-600 dark:bg-gray-800 dark:caret-gray-300 dark:ring-yellow-600"
            placeholder="搜尋 ..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div
            className={clsx([
              "absolute right-3 h-5 w-5 rounded-full bg-gray-300 p-0.5 text-gray-600 transition-all",
              searchText ? "scale-100" : "scale-0",
            ])}
            onClick={() => setSearchText("")}
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
        <div className="inset-0 mx-auto min-h-0 w-full flex-1 overflow-y-auto transition-all sm:max-w-lg">
          <div className={clsx(!posts.pins().length && "hidden")}>
            <div className="inset-0 mx-auto mb-3 flex items-center space-x-3 px-3 sm:max-w-sm">
              <hr className="flex-1 border dark:border-gray-800" />
              <span className="flex-none dark:text-gray-500">已釘選</span>
              <hr className="flex-1 border dark:border-gray-800" />
            </div>
            <div
              id="pinned"
              className="xs:grid-cols-2 xs:gap-2 xs:space-y-0 grid grid-cols-1 space-y-2"
            >
              {posts.pins().map((todo) => {
                return (
                  <Post key={todo.id} {...todo} open={[edit, setMode]}></Post>
                );
              })}
            </div>
            <div className="inset-0 mx-auto mb-3 mt-6 flex items-center space-x-3 px-3 sm:max-w-sm">
              <hr className="flex-1 border dark:border-gray-800" />
              <span className="flex-none dark:text-gray-500">未釘選</span>
              <hr className="flex-1 border dark:border-gray-800" />
            </div>
          </div>
          <div
            id="unpinned"
            className="xs:grid-cols-2 xs:gap-2 xs:space-y-0 grid grid-cols-1 space-y-2"
          >
            {posts.unpins().map((todo) => {
              return (
                <Post key={todo.id} {...todo} open={[edit, setMode]}></Post>
              );
            })}
          </div>
        </div>
      </div>
      <FloatButton floatButtonClicked={floatButtonClicked}></FloatButton>
      <Modal
        title={mode === "create" ? "新增待辦事項" : "修改待辦事項"}
        openned={modalOpened}
        closed={[setModalOpened, setMode]}
      >
        <PostCreator
          {...editData}
          mode={mode}
          save={[addPost, updatePost]}
        ></PostCreator>
      </Modal>
      <Drawer opened={drawerOpened} setDrawerOpened={setDrawerOpened} />
      {/* <Modal
        opened="modalOpened"
        onClosed="modalOpened = false;mode = 'create';"
        title="mode === 'create' ? '新增待辦事項' : '修改待辦事項'"
      >
        <PostCreator
          onAdd="addPost($event)"
          onEdit="updatePost($event)"
          v-bind="editData"
          mode="mode"
        />
      </Modal>
      <Drawer opened="drawerOpened" onClosed="drawerOpened = false" /> */}
    </div>
  );
}

export default App;
