import React from 'react';
import Enzyme, { shallow, mount, render, configure } from 'enzyme';
import ReactAdapter from 'enzyme-adapter-react-16';
import Form from './Form';

Enzyme.configure({
  adapter: new ReactAdapter(),
});

describe('Form', () => {
  let form;
  const props = {
    onSubmit: null,
    onReset: null,
    onChange: null,
  };

  beforeEach(() => {
    props.onSubmit = jest.fn();
    props.onChange = jest.fn();
    props.onReset = jest.fn();
    props.model = {
      price: 123,
      title: 'test',
    };

    form = shallow(
      <Form {...props}>
        <input name="title" type="text" />
        <input name="price" type="number" />
        <button type="submit">Save</button>
        <button type="reset">Cancel</button>
      </Form>,
    );
  });

  it('should render children', () => {
    expect(form.children()).toHaveLength(4);
  });

  it('should submit', () => {
    expect(props.onSubmit).toHaveBeenCalledTimes(0);
    form.simulate('submit');
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });
  // it('should handle change', () => {
  //   form = form.render();
  //   expect(props.onChange).toHaveBeenCalledTimes(0);
  //   const eventData = { title: 'new title' };
  //   form.find('[name="title"]').simulate('change', eventData);
  //   expect(props.onChange).toHaveBeenCalledWith(eventData);
  // });
  it('should handle reset', () => {
    expect(props.onReset).toHaveBeenCalledTimes(0);
    form.simulate('reset');
    expect(props.onReset).toHaveBeenCalledTimes(1);
  });
});
