import { SetStateAction } from "react";

function Navigator({ handler }) {
  function pageSelected(page: SetStateAction<string>) {
    handler(page);
  }

  return (
    <ul className="navigation">
      <li key="meals">
        <a onClick={() => pageSelected("meals")}>Meals</a>
      </li>
      <li key="ingredients">
        <a onClick={() => pageSelected("ingredients")}>Ingredients</a>
      </li>
    </ul>
  );
}

export default Navigator;
