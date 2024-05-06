import { describe, it, expect, beforeEach } from 'vitest';
import { mount, VueWrapper } from '@vue/test-utils';
import ListComponent from './ListComponent.vue';

describe('ListComponent', () => {
  let wrapper: VueWrapper<any>;
  const mockItems: any[] = [
    {
      id: '1212',
      name: 'asdasd',
      image: 'asasdasd',
      tags: [{ id: '1', name: 'tag1' }],
    },
    {
      id: '2323',
      name: 'qweqwe',
      image: 'zxczxc',
      tags: [{ id: '2', name: 'tag2' }],
    },
  ];

  beforeEach(() => {
    wrapper = mount(ListComponent, {
      props: {
        items: mockItems,
      },
    });
  });

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('renders list items', () => {
    const listItems = wrapper.findAll('[data-qa="list-item"]');
    expect(listItems.length).toBe(mockItems.length);
  });

  it('renders item details', () => {
    const firstItem = wrapper.find('[data-qa="list-item"]:first-child');
    expect(firstItem.find('[data-qa="tag"]').exists()).toBe(true);
    expect(firstItem.find('h2').text()).toBe(mockItems[0].name);
    expect(firstItem.find('img').attributes('src')).toBe(mockItems[0].image);
  });
});