import { Provider } from "react-redux";
import Search from "./index";
import { render, screen, cleanup } from "@testing-library/react";
import store from "../../store";

const setup = () =>
    render(
        <Provider store={store}>
            <Search onSuccess={function (tracks: any[], text: string): void {
                throw new Error("Function not implemented.");
            } } />
        </Provider>
    );

describe ("Search bar should rendered", () => {
    beforeEach(setup);
    afterEach(cleanup);

    it("Success rendered", () => {
        const SearchBarForm = screen.getByTestId("SearchBarForm");

        expect(SearchBarForm).toBeInTheDocument();
    });
});