import { useCreateStore } from '../createStore';

import type { Question } from '@/types/templates';

jest.mock('@/db/preview', () => ({
  updatePreviewTemplate: jest.fn().mockReturnValue(true),
}));

describe('useCreateStore 상태 및 액션 테스트', () => {
  const question1: Question = {
    id: 'q1',
    type: 'text',
    label: '질문1',
    required: true,
  };
  const question2: Question = {
    id: 'q2',
    type: 'radio',
    label: '질문2',
    options: ['A', 'B'],
    required: false,
  };

  beforeEach(() => {
    useCreateStore.getState().resetStore();
    jest.clearAllMocks();
  });

  test('초기 상태 확인', () => {
    const state = useCreateStore.getState();
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.description).toBe('');
    expect(state.questions).toEqual([]);
  });

  test('템플릿 제목 변경', () => {
    useCreateStore.getState().setTitle('새 제목');
    const state = useCreateStore.getState();
    expect(state.title).toBe('새 제목');
    expect(state.description).toBe('');
    expect(state.questions).toEqual([]);
  });

  test('템플릿 설명 변경', () => {
    useCreateStore.getState().setDescription('설명 추가');
    const state = useCreateStore.getState();
    expect(state.description).toBe('설명 추가');
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.questions).toEqual([]);
  });

  test('질문 추가', () => {
    useCreateStore.getState().setQuestions([question1, question2]);
    const state = useCreateStore.getState();
    expect(state.questions).toEqual([question1, question2]);
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.description).toBe('');
  });

  test('특정 질문 수정', () => {
    useCreateStore.getState().setQuestions([question1, question2]);
    useCreateStore.getState().setQuestion({ ...question2, label: '질문2-수정' });
    const state = useCreateStore.getState();
    expect(state.questions[1].label).toBe('질문2-수정');
    expect(state.questions[1].options).toEqual(['A', 'B']);
    expect(state.questions[0].label).toBe('질문1');
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.description).toBe('');
  });

  test('특정 질문 삭제', () => {
    useCreateStore.getState().setQuestions([question1, question2]);
    useCreateStore.getState().deleteQuestion('q1');
    const state = useCreateStore.getState();
    expect(state.questions).toEqual([question2]);
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.description).toBe('');
  });

  test('resetStore로 초기화', () => {
    useCreateStore.getState().setTitle('임시 제목');
    useCreateStore.getState().setDescription('임시 설명');
    useCreateStore.getState().setQuestions([question1]);
    useCreateStore.getState().resetStore();
    const state = useCreateStore.getState();
    expect(state.title).toBe('제목 없는 템플릿');
    expect(state.description).toBe('');
    expect(state.questions).toEqual([]);
  });
});
