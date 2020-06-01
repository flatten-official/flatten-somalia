import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent } from "react-formio";
import { Provider } from "react-redux";
import store from "../../../store";
import { I18nextProvider } from "react-i18next";

const CustomFormIoComponent = (InnerComponent) => {
  return class FollowUpDisplayInjector extends ReactComponent {
    /**
     * This function is called when the DIV has been rendered and added to the DOM. You can now instantiate the react component.
     *
     * #returns ReactInstance
     */
    attachReact(element) {
      // eslint-disable-next-line react/no-render-return-value
      return ReactDOM.render(
        <Provider store={store}>
          <InnerComponent component={this.component} />
        </Provider>,
        element
      );
    }

    /**
     * Automatically detach any react components.
     *
     * @param element
     */
    detachReact(element) {
      if (element) ReactDOM.unmountComponentAtNode(element);
    }
  };
};

export default CustomFormIoComponent;
