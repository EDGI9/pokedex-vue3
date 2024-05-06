import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import Modal from './Modal.vue';

describe('Modal', () => {
  let wrapper: VueWrapper<any>;
  const mockContent = '<h1>Hello, World!</h1>';

  beforeEach(() => {
    wrapper = mount(Modal, {
      slots: {
        default: mockContent,
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders content passed through the slot', () => {
    const modalContent = wrapper.find('[data-qa="modal"]');
    expect(modalContent.html()).toContain(mockContent);
  });
});