type state = {name: string};

type action =
  | UpdateName(string);

let component = ReasonReact.reducerComponent(__MODULE__);

let make = (~name: string, _) => {
  ...component,
  initialState: () => {name: name},
  reducer: (action, _state) =>
    switch (action) {
    | UpdateName(name) => ReasonReact.Update({name: name})
    },
  render: ({state, send}) =>
    <div>
      <h3>
        ("Hello, " ++ state.name ++ " from Reason!" |> ReasonReact.string)
      </h3>
      <hr />
      <form>
        <label htmlFor="name">
          ("Say hello to:" |> ReasonReact.string)
        </label>
        <input
          id="name"
          type_="text"
          value=state.name
          onChange=(
            event => event->ReactEvent.Form.target##value->UpdateName->send
          )
        />
      </form>
    </div>,
};

ReactOnRails.register("HelloReason", (props, _context) => ReasonReact.element(make(~name=props##name, [||])))
