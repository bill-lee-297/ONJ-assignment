import '@testing-library/jest-dom';

import { act, renderHook } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import useHandleModify from '@/hooks/useHandleModify';
import type { CreateTemplate, Template } from '@/types/templates';

const mockShowAlert = jest.fn().mockImplementation(() => Promise.resolve(true));
jest.mock('@/hooks/useAlert', () => jest.fn(() => mockShowAlert));

const originalData = {
  id: 'tpl-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
  title: '템플릿 제목',
  description: '템플릿 내용',
  createdAt: '2025-06-17T08:17:24.285Z',
  updatedAt: '2025-06-17T08:17:24.285Z',
  questions: [
    {
      id: 'qst-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
      type: 'text',
      label: '템플릿 질문',
    },
  ],
};

const modifyData = {
  id: 'tpl-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
  title: '템플릿 수정',
  description: '템플릿 수정 내용',
  questions: [
    {
      id: 'qst-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
      type: 'text',
      label: '템플릿 수정 질문',
    },
  ],
};

describe('useHandleModify 커스텀 훅', () => {
  beforeEach(() => {
    jest.spyOn(console, 'warn').mockImplementation(jest.fn());
    mockShowAlert.mockClear();
  });

  test('템플릿 수정', async () => {
    localStorage.setItem('templates', JSON.stringify([originalData]));

    const { result } = renderHook(() => useHandleModify(modifyData as CreateTemplate & Pick<Template, 'id'>), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e);
    });

    expect(mockShowAlert).toHaveBeenCalledWith('이대로 저장하시겠습니까?', { cancel: true });
    expect(await mockShowAlert.mock.results[0].value).toBe(true);

    const storedData = localStorage.getItem('templates');
    const parsedData = JSON.parse(storedData as string)[0];

    expect(parsedData).toEqual(
      expect.objectContaining({
        title: modifyData.title,
        description: modifyData.description,
        questions: modifyData.questions,
      }),
    );

    expect(new Date(parsedData.createdAt).getTime()).not.toBeNaN();
    expect(new Date(parsedData.updatedAt).getTime()).not.toBeNaN();
  });

  test('템플릿 제목 누락', async () => {
    modifyData.title = '';

    const { result } = renderHook(() => useHandleModify(modifyData as CreateTemplate & Pick<Template, 'id'>), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e);
    });

    expect(mockShowAlert).toHaveBeenCalledWith('제목을 입력해주세요.', { cancel: false });

    modifyData.title = '템플릿 수정';
  });

  test('템플릿 질문 누락', async () => {
    modifyData.questions = [];

    const { result } = renderHook(() => useHandleModify(modifyData as CreateTemplate & Pick<Template, 'id'>), {
      wrapper: MemoryRouter,
    });

    const e = new Event('submit') as unknown as React.FormEvent<HTMLFormElement>;
    await act(async () => {
      await result.current(e);
    });

    expect(mockShowAlert).toHaveBeenCalledWith('질문을 추가해주세요.', { cancel: false });

    modifyData.questions = [
      {
        id: 'qst-12813982-898e-4fd1-b8f1-27ae2ea6f13a',
        type: 'text',
        label: '템플릿 수정 질문',
      },
    ];
  });
});
