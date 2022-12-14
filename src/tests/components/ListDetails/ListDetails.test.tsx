/* eslint-disable testing-library/no-unnecessary-act */
import { Listdetails } from "../../../views/ListDetails";
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import { BrowserRouter as Router, MemoryRouter } from "react-router-dom";

import { BASE_API } from "../../../utils/constants";

import postsJSON from "../../__mockdata__/posts.json";
import { Provider } from "react-redux";
import store from "../../../store";
import userEvent from "@testing-library/user-event";

const printLog = (msg: any) => {
  // Comment below line if you don't want to see the logs
  // console.log(msg);
};

const server = setupServer(
  rest.get(`${BASE_API}/posts`, (req, res, ctx) => {
    printLog(`${req.method} ${BASE_API}/posts`);
    return res(ctx.json(postsJSON));
  }),
  rest.delete(`${BASE_API}/posts/:id`, (req, res, ctx) => {
    printLog(`${req.method} ${BASE_API}/posts/${req.params.id}`);
    return res(ctx.json({}));
  })
);

describe("ListDetails", () => {
  beforeAll(async () => {
    printLog("beforeAll");
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  it("should render correctly", async () => {
    printLog("it should render correctly #1");
    const view = render(
      <Router>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </Router>
    );
    expect(view).toMatchSnapshot();
  });

  it("deleting the post", async () => {
    printLog("deleting the post #4");
    render(
      <Router>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </Router>
    );

    await act(() => userEvent.click(screen.getByTestId("fetchPosts")));
    expect(
      (await screen.findAllByTestId("post-card", {}, { timeout: 5000 })).length
    ).toEqual(100);
    const deletePost = screen.getAllByTestId("deletePost")[1];
    // wait for the request to change the ui
    await act(() => userEvent.click(deletePost));

    const newPostCard = await screen.findAllByTestId("post-card");
    expect(newPostCard.length).toEqual(99);
  });

  it("should render correctly with posts", async () => {
    printLog("it should render correctly with posts #2");
    render(
      <Router>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </Router>
    );
    userEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i, {}, { timeout: 5000 });
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(99);
  });

  it("should render correctly with posts and delete", async () => {
    printLog("it should render correctly with posts and delete #3");
    render(
      <Router>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </Router>
    );
    await act(() => userEvent.click(screen.getByTestId("fetchPosts")));
    printLog("after act");
    const vc = await screen.findAllByTestId("deletePost");
    expect(vc.length).toEqual(100);
  });

  it("should check and uncheck the checkbox", async () => {
    render(
      <Router>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </Router>
    );

    await act(() => userEvent.click(screen.getByTestId("fetchPosts")));
    const check1 = await screen.findByTestId<HTMLInputElement>("chkbx-1");
    await act(() => userEvent.click(check1));
    expect(check1.checked).toBeTruthy();
    await act(async () =>
      userEvent.click(await screen.findByTestId(/check-all/i))
    );
    await act(async () =>
      userEvent.click(await screen.findByTestId(/uncheck-all/i))
    );
    expect(check1.checked).toBeFalsy();
  });

  // TODO: fix this test navigation is failing
  it.skip("move to details page", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Provider store={store}>
          <Listdetails />
        </Provider>
      </MemoryRouter>
    );

    await act(() => userEvent.click(screen.getByTestId("fetchPosts")));
    const showdDetails = await screen.findByTestId<HTMLButtonElement>(
      "show-post-1"
    );
    await act(() => userEvent.click(showdDetails));
    const text = await screen.findByText(
      /Leanne Grahams/i,
      {},
      { timeout: 5000 }
    );
    console.log(text);
    expect(text).toBeInTheDocument();
  });

  afterAll(async () => {
    printLog("afterAll");
    server.close();
  });

  
  
});
