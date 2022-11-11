import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import Button from "../../../components/ui/Button";

describe('Testing button component', () => {
    
    test('button clickable', () => {
        const jestClick = jest.fn((e:React.FormEvent<HTMLInputElement>) => {
            const target = e.target as typeof e.target & {
                value: string
            }
            console.log('Im clicked', target.value);
        });
        render(<Button onclick={jestClick}>Click</Button>);

        expect(jestClick.mock.calls.length).toBe(0);
        const button = screen.getByTestId('button');

        fireEvent.click(button);

        expect(jestClick.mock.calls.length).toEqual(1);
        fireEvent.click(button);

        expect(jestClick.mock.calls.length).toEqual(2);
    })
});