import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useMyStore } from '../stores/myStore';
import { mount, VueWrapper } from '@vue/test-utils';
import MyForm from '../components/MyForm.vue';

const pinia = createPinia();
setActivePinia(pinia);

describe('MyForm', () => {
  let store: ReturnType<typeof useMyStore>;
  let wrapper:VueWrapper<any>;
  const dataNames=['abc','def','ghi']
  let results =  [
    { name: dataNames[0], id: 1 },
    { name: dataNames[1], id: 2 },
    { name: dataNames[2], id: 3 } 
  ];
  
  beforeEach(() => {
    store = useMyStore();
    store.reset();
    wrapper = mount(MyForm, { pinia });
  });

  it('Text inputs emit update event and commit to store', async () => {

    const input1 = wrapper.find('[data-qa="qa-filters_input-1"]');
    const input2 = wrapper.find('[data-qa="qa-filters_input-2"]');
    const input3 = wrapper.find('[data-qa="qa-filters_input-3"]');

    input1.setValue(dataNames[0]);
    await wrapper.vm.$nextTick();
    expect(store.fetchItems).toHaveBeenCalledTimes(1);
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[0]);

    input2.setValue(dataNames[1]);
    await wrapper.vm.$nextTick();
    expect(store.fetchItems).toHaveBeenCalledTimes(2);
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[1]);

    input3.setValue(dataNames[2]);
    await wrapper.vm.$nextTick();
    expect(store.fetchItems).toHaveBeenCalledTimes(3);
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[2]);
  });

  it('Buttons render with fetched items and emit click event', async () => {
    store.items = results;

    const button1 = wrapper.find('[data-qa="qa-filters_button-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_button-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_button-3"]');

    button1.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).toEqual(results[0]);

    button2.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).toEqual(results[1]);

    button3.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).toEqual(results[2]);
  });

  it('TextArea renders activeFilters items', async () => {
    store.activeFilters = [results];

    const button1 = wrapper.find('[data-qa="qa-filters_active-filters-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_active-filters-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_active-filters-3"]');

    expect(button1.exists()).toBe(true);
    expect(button2.exists()).toBe(true);
    expect(button3.exists()).toBe(true);
  });

  it('Active filters buttons remove active filters when clicked', async () => {
    store.activeFilters = [results];

    const button1 = wrapper.find('[data-qa="qa-filters_active-filters-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_active-filters-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_active-filters-3"]');

    button1.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).not.toEqual(results[0]);

    button2.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).not.toEqual(results[2]);

    button3.trigger('click');
    await wrapper.vm.$nextTick();
    expect(store.activeFilters).not.toEqual(results[3]);
  });
});