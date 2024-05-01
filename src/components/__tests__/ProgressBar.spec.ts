import { mount } from '@vue/test-utils';
import ProgressBar from './ProgressBar.vue';

describe('ProgressBar', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(ProgressBar, {
      props: {
        value: 50,
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('receives a integer value as a prop', () => {
    expect(wrapper.props().value).toBe(50);
  });
});