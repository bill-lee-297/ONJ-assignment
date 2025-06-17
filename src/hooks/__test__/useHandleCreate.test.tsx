import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import useHandleCreate from '@/hooks/useHandleCreate';
import type { CreateTemplate } from '@/types/templates';

const mockShowAlert = jest.fn().mockImplementation(() => Promise.resolve(true));
jest.mock('@/hooks/useAlert', () => jest.fn(() => mockShowAlert));

const data = {
  title: '템플릿 제목',
  description: '템플릿 내용',
  questions: [
    {
      id: 'qst-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
      type: 'text',
      label: '템플릿 질문',
    },
  ],
};

describe('useHandleCreate 커스텀 훅', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    mockShowAlert.mockClear();
  });

  test('템플릿 생성', async () => {
    const { result } = renderHook(() => useHandleCreate(data as CreateTemplate), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e, 'create');
    });

    expect(mockShowAlert).toHaveBeenCalledWith('이대로 저장하시겠습니까?', { cancel: true });
    expect(await mockShowAlert.mock.results[0].value).toBe(true);

    const storedData = localStorage.getItem('templates');
    const parsedData = JSON.parse(storedData as string)[0];

    expect(parsedData).toEqual(
      expect.objectContaining({
        title: data.title,
        description: data.description,
        questions: data.questions,
      }),
    );

    expect(new Date(parsedData.createdAt).getTime()).not.toBeNaN();
    expect(new Date(parsedData.updatedAt).getTime()).not.toBeNaN();
  });

  test('템플릿 복제', async () => {
    const { result } = renderHook(() => useHandleCreate(data as CreateTemplate), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e, 'duplicate');
    });

    expect(mockShowAlert).toHaveBeenCalledWith('새로운 템플릿으로 생성하시겠습니까?', { cancel: true });
    expect(await mockShowAlert.mock.results[0].value).toBe(true);

    const storedData = localStorage.getItem('templates');
    const parsedData = JSON.parse(storedData as string)[0];

    expect(parsedData).toEqual(
      expect.objectContaining({
        title: data.title,
        description: data.description,
        questions: data.questions,
      }),
    );

    expect(new Date(parsedData.createdAt).getTime()).not.toBeNaN();
    expect(new Date(parsedData.updatedAt).getTime()).not.toBeNaN();
  });

  test('템플릿 제목 누락', async () => {
    data.title = '';

    const { result } = renderHook(() => useHandleCreate(data as CreateTemplate), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e, 'create');
    });

    expect(mockShowAlert).toHaveBeenCalledWith('제목을 입력해주세요.', { cancel: false });
    data.title = '템플릿 제목';
  });

  test('템플릿 질문 누락', async () => {
    data.questions = [];

    const { result } = renderHook(() => useHandleCreate(data as CreateTemplate), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e, 'create');
    });

    expect(mockShowAlert).toHaveBeenCalledWith('질문을 추가해주세요.', { cancel: false });

    data.questions = [
      {
        id: 'qst-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
        type: 'text',
        label: '템플릿 질문',
      },
    ];
  });
});
