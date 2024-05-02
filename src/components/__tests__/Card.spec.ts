import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Card from './Card.vue';


describe('Card', () => {
    let wrapper: any;
    const mainColor:string = '#f0f0f0';
    const accentColor:string = '#3f51b5';
    const titleText:string = 'My Title';
    const categoriesText:string = 'Category 1';
    const imageText:string = 'My Image';
    const clickEventData = {
        title: titleText,
        categories: categoriesText,
        image: imageText,
    };

    beforeEach(() => {
        wrapper = mount(Card, {
        props: {
            mainColor: mainColor,
            accentColor: accentColor,
        },
        slots: {
            title: `<div>${titleText}</div>`,
            categories: `<div>${categoriesText}</div>`,
            image: `<div>${imageText}</div>`,
        },
        });
    });

    it('renders the component', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('receives a string value for title slot', () => {
        const titleSlot = wrapper.find('[data-qa="title-slot"]');
        expect(titleSlot.exists()).toBe(true);
        expect(titleSlot.text()).toBe(titleText);
    });

    it('renders the content passed to categories slot', () => {
        const categoriesSlot = wrapper.find('[data-qa="categories-slot"]');
        expect(categoriesSlot.exists()).toBe(true);
        expect(categoriesSlot.text()).toBe(categoriesText);
    });

    it('receives some content for image slot', () => {
        const imageSlot = wrapper.find('[data-qa="image-slot"]');
        expect(imageSlot.exists()).toBe(true);
    });

    it('receives two props with string values', () => {
        expect(wrapper.props().mainColor).toBe(mainColor);
        expect(typeof wrapper.props().mainColor).toBe('string');

        expect(wrapper.props().accentColor).toBe(accentColor);
        expect(typeof wrapper.props().accentColor).toBe('string');
    });

    it('emits a click event with an object type', async () => {
        const button = wrapper.find('[data-qa="card-button"]');
        button.trigger('click');
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted().click).toBeTruthy();
        expect(wrapper.emitted().click[0]).toEqual(clickEventData);
    });
});
