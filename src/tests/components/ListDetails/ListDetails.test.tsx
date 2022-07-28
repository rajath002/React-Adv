import ListDetails from "../../../components/ListDetails";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { BASE_API } from "../../../utils/constants";

import postsJSON from "../../__mockdata__/posts.json";
import { Provider } from "react-redux";
import store from "../../../store";

const server = setupServer(
  rest.get(`${BASE_API}/posts`, (req, res, ctx) => {
    return res(ctx.json(postsJSON));
  }),
  rest.delete(`${BASE_API}/posts/:id`, (req, res, ctx) => {
    console.log(`${BASE_API}/posts/${req.params.id}`);
    return res(ctx.json({}));
  })
);

describe("ListDetails", () => {
  beforeAll(async () => {
    console.log("beforeAll");
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  it("should render correctly", async () => {
    const view = render(
      <Provider store={store}>
        <ListDetails />
      </Provider>
    );
    expect(view).toMatchSnapshot();
  });

  it("should render correctly with posts", async () => {
    render(
      <Provider store={store}>
        <ListDetails />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i);
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(99);
  });

  it("should render correctly with posts and delete", async () => {
    render(
      <Provider store={store}>
        <ListDetails />
      </Provider>
    );
    fireEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i);
    fireEvent.click(screen.getAllByTestId("deletePost")[1]);
    console.log("before act");

    await act(() => Promise.resolve());
    console.log("after act");
    const vc = await screen.findAllByTestId("deletePost");
    expect(vc.length).toEqual(100);
  });

  afterAll(async () => {
    // console.log("afterAll");
    server.close();
  });
});
