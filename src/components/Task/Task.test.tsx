import {fireEvent, render, screen} from "@testing-library/react";
import Task from "./Task";

const deleteTask = jest.fn()
const changeStatusTask = jest.fn()

const MockData = {
  id: "23434-sdvsvdfvdfvfdv-dfvdfvdfvdfv",
  title: "выпить кофе",
  isDone: false
}


describe('Task', () => {
  it('should show correct title', () => {
    render(<Task task={MockData} deleteTask={deleteTask} changeStatusTask={changeStatusTask}/>)
    const taskTitle = screen.getByText("выпить кофе")
    expect(taskTitle).toBeInTheDocument()
  });
  it("should call the changeStatusTask with  status true  ", () => {
    render(<Task task={MockData} changeStatusTask={changeStatusTask} deleteTask={deleteTask}/>)
    const checkbox = screen.getByRole("checkbox")
    fireEvent.click(checkbox)
    expect(changeStatusTask).toHaveBeenCalledWith("23434-sdvsvdfvdfvfdv-dfvdfvdfvdfv", true)
  });
  it("should call the deleteTask with  true id  ", () => {
    render(<Task task={MockData} changeStatusTask={changeStatusTask} deleteTask={deleteTask}/>)
    const deleteButton = screen.getByText("x")
    fireEvent.click(deleteButton)
    expect(deleteTask).toHaveBeenCalledWith("23434-sdvsvdfvdfvfdv-dfvdfvdfvdfv");
  });
})