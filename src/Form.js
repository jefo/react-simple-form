import React from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  withState,
  withHandlers,
  renderComponent,
  mapProps,
  toClass,
} from 'recompose';
import { isFunction, merge } from 'lodash';

const enhance = compose(
  withState('model', 'setModel', {}),
  withHandlers({
    handleChange: props => e => {
      e.preventDefault();
      const { setModel, model, onChange } = props;
      const { name, value } = e.currentTarget;
      setValues(
        merge({}, model, {
          [name]: value,
        }),
      );
      if (isFunction(onChange)) {
        onChange({ [name]: value });
      }
    },
    handleSubmit: ({ model, onSubmit }) => e => {
      e.preventDefault();
      if (isFunction(onSubmit)) {
        onSubmit(model);
      }
    },
    handleReset: ({ setModel, onReset, history }) => e => {
      setModel({});
      if (isFunction(onReset)) {
        onReset(e, history);
      }
    },
  }),
);

function Form({ model, handleSubmit, handleChange, handleReset, children }) {
  return (
    <form
      onSubmit={handleSubmit}
      onReset={handleReset}
      noValidate
      autoComplete="off"
    >
      {React.Children.map(children, child =>
        React.cloneElement(child, {
          onChange: handleChange,
          value: model[child.props.name],
        }),
      )}
    </form>
  );
}

Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default enhance(Form);
