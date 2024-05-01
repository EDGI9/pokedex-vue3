import { mount } from '@vue/test-utils';
import Card from './Card.vue';


describe('Card', () => {
    let wrapper;
    const MAIN_COLOR = '#f0f0f0';
    const ACCENT_COLOR = '#3f51b5';
    const TITLE_TEXT = 'My Title';
    const CATEGORIES_TEXT = 'Category 1, Category 2';
    const IMAGE_TEXT = 'My Image';
    const CLICK_EVENT_DATA = {
        title: TITLE_TEXT,
        categories: CATEGORIES_TEXT,
        image: IMAGE_TEXT,
    };

    beforeEach(() => {
        wrapper = mount(Card, {
        props: {
            mainColor: MAIN_COLOR,
            accentColor: ACCENT_COLOR,
        },
        slots: {
            title: `<div>${TITLE_TEXT}</div>`,
            categories: `<div>${CATEGORIES_TEXT}</div>`,
            image: `<div>${IMAGE_TEXT}</div>`,
        },
        });
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('receives a string value for title slot', () => {
        const titleSlot = wrapper.find('[data-qa="title-slot"]');
        expect(titleSlot.text()).toBe(TITLE_TEXT);
    });

    it('receives an array of strings for categories slot', () => {
        const categoriesSlot = wrapper.find('[data-qa="categories-slot"]');
        expect(categoriesSlot.text()).toBe(CATEGORIES_TEXT);
    });

    it('receives some content for image slot', () => {
        const imageSlot = wrapper.find('[data-qa="image-slot"]');
        expect(imageSlot.exists()).toBe(true);
    });

    it('receives two props with string values', () => {
        expect(wrapper.props().mainColor).toBe(MAIN_COLOR);
        expect(typeof wrapper.props().mainColor).toBe('string');

        expect(wrapper.props().accentColor).toBe(ACCENT_COLOR);
        expect(typeof wrapper.props().accentColor).toBe('string');
    });

    it('emits a click event with an object type', async () => {
        const button = wrapper.find('[data-qa="card-button"]');
        button.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().click).toBeTruthy();
        expect(wrapper.emitted().click[0]).toEqual([CLICK_EVENT_DATA]);
    });
});
