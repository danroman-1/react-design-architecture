/* eslint-env jest*/
import React from 'react';
import {
  renderIntoDocument,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass,
} from 'react-dom/test-utils';

import CalendarHeader from '../CalendarHeader';
import DateTimeFormat from '../../utils/DateUtils/DateTimeFormat';

jest.mock('../../utils/DateUtils/DateTimeFormat');


describe('CalendarHeader', () => {
  afterEach(DateTimeFormat.mockClear);

  it('renders the day of week abbreviations', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const dows = findRenderedDOMComponentWithClass(header, 'md-calendar-dows');
    expect(dows.childNodes.length).toBe(7);
  });

  it('formats the date with a month and year', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    expect(DateTimeFormat.mock.calls[1][0]).toBe(props.locales);
    expect(DateTimeFormat.mock.calls[1][1]).toEqual({ month: 'long', year: 'numeric' });
  });

  it('should use "titleClassName" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      date: new Date(),
      titleClassName: 'test-title-class',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const title = findRenderedDOMComponentWithClass(header, 'md-title');
    expect(title.className).toMatch(props.titleClassName);
  });

  it('formats the date with options specified in "titleFormat" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      titleFormat: { month: 'numeric', year: '2-digit' },
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    // first call is from generateDows
    const formatCall = DateTimeFormat.mock.calls[1];
    expect(formatCall[0]).toBe(props.locales);
    expect(formatCall[1]).toEqual(props.titleFormat);
  });

  it('should use "weekdayClassName" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      date: new Date(),
      titleClassName: 'test-title-class',
      weekdayClassName: 'test-weekday-class',
    };

    const header = renderIntoDocument(<CalendarHeader {...props} />);
    const weekday = scryRenderedDOMComponentsWithClass(header, 'md-calendar-dow')[0];
    expect(weekday.className).toMatch(props.weekdayClassName);
  });

  it('formats a weekday using value specified in "weekdayFormat" property', () => {
    const props = {
      DateTimeFormat,
      locales: 'en-US',
      onPreviousClick: jest.fn(),
      onNextClick: jest.fn(),
      previousIconChildren: 'a',
      nextIconChildren: 'a',
      date: new Date(),
      weekdayFormat: 'short',
    };

    renderIntoDocument(<CalendarHeader {...props} />);
    const formatCall = DateTimeFormat.mock.calls[0];
    expect(formatCall[0]).toBe(props.locales);
    expect(formatCall[1]).toEqual({ weekday: props.weekdayFormat });
  });
});
