import ListDetails from "../../../components/ListDetails";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

import { BASE_API } from "../../../utils/constants";

import postsJSON from "../../__mockdata__/posts.json";

const server = setupServer(
  rest.get(`${BASE_API}/posts`, (req, res, ctx) => {
    return res(ctx.json(postsJSON));
  }),
  rest.delete(`${BASE_API}/posts/:id`, (req, res, ctx) => {
    console.log("hey there I'm here", req.params.id);
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
    const view = render(<ListDetails />);
    expect(view).toMatchSnapshot();
  });

  it("should render correctly with posts", async () => {
    render(<ListDetails />);
    fireEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i);
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(99);
  });

  it("should render correctly with posts and delete", async () => {
    render(<ListDetails />);
    fireEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i);
    fireEvent.click(screen.getAllByTestId("deletePost")[1]);
    await act(async () => {
      // hack to wait for the request to be sent
      return new Promise((resolve) => setTimeout(() => resolve(), 4000));
    });
    const vc = await screen.findAllByTestId("deletePost");
    expect(vc.length).toBeLessThan(100);
  });

  afterAll(async () => {
    console.log("afterAll");
    server.close();
  });
});
