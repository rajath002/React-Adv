import ListDetails from "../../../components/ListDetails";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ListDetails", () => {
  it("should render correctly", async () => {
    render(<ListDetails />);
    fireEvent.click(screen.getByTestId("fetchPosts"));

    await screen.findByText(/qui est esse/i);

    expect(screen.getAllByTestId("post-card").length).toBeGreaterThan(99);
    // expect(view).toMatchSnapshot();
  });
});
