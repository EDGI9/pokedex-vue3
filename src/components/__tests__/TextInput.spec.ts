import { mount } from '@vue/test-utils';
import TextInput from './TextInput.vue';


describe('TextInput', () => {
    let wrapper;
    const mockText = 'Hello World';

    beforeEach(() => {
        wrapper = mount(TextInput);
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('has text content', () => {
        const input = wrapper.find('[data-qa="text-input"]');
        input.setValue(mockText);
        expect(input.element.value).toBe(mockText);
    });

    it('emits an update event whenever the user types', async () => {
        const input = wrapper.find('[data-qa="text-input"]');
        input.setValue(mockText);
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().update).toBeTruthy();
    });

    it('checks if update event returns text content', async () => {
        const input = wrapper.find('[data-qa="text-input"]');
        input.setValue(mockText);
        await wrapper.vm.$nextTick();
        expect(wrapper.emitted().update[0][0]).toBe(mockText);
    });
});