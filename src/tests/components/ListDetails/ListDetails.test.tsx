import ListDetails from "../../../components/ListDetails";
import { fireEvent, render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import "@testing-library/jest-dom";

import { BASE_API } from "../../../utils/constants";

import postsJSON from "../../__mockdata__/posts.json";

const server = setupServer(
  rest.get(`${BASE_API}/posts`, (req, res, ctx) => {
    console.log("hey there I'm here");
    return res(ctx.json(postsJSON));
  })
);

describe("ListDetails", () => {
  beforeAll(async () => {
    console.log("beforeAll");
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  it("should render correctly", async () => {
    render(<ListDetails />);
    fireEvent.click(screen.getByTestId("fetchPosts"));
    await screen.findByText(/qui est esse/i);
    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(99);
    // expect(view).toMatchSnapshot();
  });

  afterAll(async () => {
    console.log("afterAll");
    server.close();
  });
});
