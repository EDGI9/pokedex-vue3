import { describe, it, expect, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useMyStore } from '../stores/myStore';
import { render, fireEvent, waitFor } from '@testing-library/vue';
import { VueWrapper } from '@vue/test-utils';
import MyForm from '../components/MyForm.vue';

const pinia = createPinia();
setActivePinia(pinia);

describe('MyForm', () => {
  let store: ReturnType<typeof useMyStore>;
  const dataNames=['abc','def','ghi']
  let results =  [
    { name: dataNames[0], id: 1 },
    { name: dataNames[1], id: 2 },
    { name: dataNames[2], id: 3 } 
  ];

  beforeEach(() => {
    store = useMyStore();
    store.reset();
  });

  it('Text inputs emit update event and commit to store', async () => {
    const wrapper: VueWrapper<any> = render(MyForm, { pinia });

    const input1 = wrapper.find('[data-qa="qa-filters_input-1"]');
    const input2 = wrapper.find('[data-qa="qa-filters_input-2"]');
    const input3 = wrapper.find('[data-qa="qa-filters_input-3"]');

    fireEvent.input(input1, { target: { value: dataNames[0] } });
    await waitFor(() => expect(store.fetchItems).toHaveBeenCalledTimes(1));
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[0]);

    fireEvent.input(input2, { target: { value: dataNames[1] } });
    await waitFor(() => expect(store.fetchItems).toHaveBeenCalledTimes(2));
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[1]);

    fireEvent.input(input3, { target: { value: dataNames[2] } });
    await waitFor(() => expect(store.fetchItems).toHaveBeenCalledTimes(3));
    expect(store.fetchItems).toHaveBeenCalledWith(dataNames[2]);
  });

  it('Buttons render with fetched items and emit click event', async () => {
    const wrapper: VueWrapper<any> = render(MyForm, { pinia });

    store.items = results;

    const button1 = wrapper.find('[data-qa="qa-filters_button-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_button-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_button-3"]');

    fireEvent.click(button1, { target: { value: results[0] } });
    expect(store.activeFilters).toEqual(results[0]);

    fireEvent.click(button2, { target: { value: results[1] } });
    expect(store.activeFilters).toEqual(results[1]);

    fireEvent.click(button3, { target: { value: results[2] } });
    expect(store.activeFilters).toEqual(results[2]);
  });

  it('TextArea renders activeFilters items', async () => {
    const wrapper: VueWrapper<any> = render(MyForm, { pinia });

    store.activeFilters = [results];

    const button1 = wrapper.find('[data-qa="qa-filters_active-filters-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_active-filters-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_active-filters-3"]');

    expect(button1.exists()).toBe(true);
    expect(button2.exists()).toBe(true);
    expect(button3.exists()).toBe(true);
  });

  it('Active filters buttons remove active filters when clicked', async () => {
    const wrapper: VueWrapper<any> = render(MyForm, { pinia });

    store.activeFilters = [results];

    const button1 = wrapper.find('[data-qa="qa-filters_active-filters-1"]');
    const button2 = wrapper.find('[data-qa="qa-filters_active-filters-2"]');
    const button3 = wrapper.find('[data-qa="qa-filters_active-filters-3"]');

    fireEvent.click(button1, { target: { value: results[0] } });
    expect(store.activeFilters).not.toEqual(results[0]);

    fireEvent.click(button2, { target: { value: results[1] } });
    expect(store.activeFilters).not.toEqual(results[2]);

    fireEvent.click(button3, { target: { value: results[2] } });
    expect(store.activeFilters).not.toEqual(results[3]);
  });
});