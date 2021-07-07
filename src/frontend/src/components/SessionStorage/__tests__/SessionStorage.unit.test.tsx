import { fireEvent, render } from "@testing-library/react";
import { useSessionState } from "..";

describe("Session Storage", () => {
  it("functions as a normal use state hook", () => {
    const Component = () => {
      const [state, setState] = useSessionState<number>({
        key: "key1",
        defaultValue: 0,
      });
      return (
        <>
          <button
            onClick={() => setState((currState) => currState + 1)}
            data-testid="increment"
          >
            Increment
          </button>
          <div>State={state}</div>
        </>
      );
    };
    const { getByTestId, getByText } = render(<Component />);
    getByText("State=0");
    fireEvent.click(getByTestId("increment"));
    getByText("State=1");
    fireEvent.click(getByTestId("increment"));
    getByText("State=2");
  });

  it("maintains state across remounts", () => {
    const Component = () => {
      const [state, setState] = useSessionState<number>({
        key: "key2",
        defaultValue: 0,
      });
      return (
        <>
          <button
            onClick={() => setState((currState) => currState + 1)}
            data-testid="increment"
          >
            Increment
          </button>
          <div>State={state}</div>
        </>
      );
    };
    const render1 = render(<Component />);
    render1.getByText("State=0");
    fireEvent.click(render1.getByTestId("increment"));
    render1.getByText("State=1");
    render1.unmount();

    const render2 = render(<Component />);
    render2.getByText("State=1");
  });

  it("resets state when key changes", () => {
    const Component = ({ _key }: { _key: string }) => {
      const [state, setState] = useSessionState<number>({
        key: _key,
        defaultValue: 0,
      });
      return (
        <>
          <button
            onClick={() => setState((currState) => currState + 1)}
            data-testid="increment"
          >
            Increment
          </button>
          <div>State={state}</div>
        </>
      );
    };
    const render1 = render(<Component _key={"1049"} />);
    render1.getByText("State=0");
    fireEvent.click(render1.getByTestId("increment"));
    render1.getByText("State=1");
    render1.unmount();

    const render2 = render(<Component _key={"1124"} />);
    render2.getByText("State=0");
    fireEvent.click(render2.getByTestId("increment"));
    render2.getByText("State=1");
    render2.unmount();
  });

  it("remembers state when key changes back", () => {
    const Component = ({ _key }: { _key: string }) => {
      const [state, setState] = useSessionState<number>({
        key: _key,
        defaultValue: 0,
      });
      return (
        <>
          <button
            onClick={() => setState((currState) => currState + 1)}
            data-testid="increment"
          >
            Increment
          </button>
          <div>State={state}</div>
        </>
      );
    };
    const render1 = render(<Component _key={"1341"} />);
    render1.getByText("State=0");
    fireEvent.click(render1.getByTestId("increment"));
    render1.getByText("State=1");
    render1.unmount();

    const render2 = render(<Component _key={"1923"} />);
    render2.getByText("State=0");

    const render3 = render(<Component _key={"1341"} />);
    render3.getByText("State=1");
  });
});
