import React from "react";
import ReactDOM from "react-dom";
import { ReactComponent } from "react-formio";
import { Provider } from "react-redux";
import store from "../../../../store";

/**
 * Returns a FormIoComponent that contains the InnerComponent
 * This pattern is required since FormIO is a 3rd party library and doesn't take React but rather pure JS.
 **/
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
          <InnerComponent formioDefinition={this.component} />
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
