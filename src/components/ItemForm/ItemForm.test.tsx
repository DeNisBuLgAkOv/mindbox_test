import {fireEvent, render, screen} from "@testing-library/react";
import ItemForm from "./ItemForm";

const addTask = jest.fn();
describe("ItemForm", () => {

  it(" should renders elements", () => {
    render(<ItemForm addTask={addTask}/>)

    const button = screen.getByText("Add")
    const input = screen.getByPlaceholderText("What needs to be done?")

    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  });


  it("should calls addTask with title when  button is clicked", () => {
    render(<ItemForm addTask={addTask}/>);
    const input = screen.getByPlaceholderText("What needs to be done?");
    const button = screen.getByText("Add");

    fireEvent.change(input, {target: {value: "выпить кофе"}});
    fireEvent.click(button);

    expect(addTask).toHaveBeenCalledWith("выпить кофе");
  });
});