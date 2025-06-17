import { getPreviewTemplate, updatePreviewTemplate } from '../preview';

import type { Template } from '@/types/templates';

describe('preview db 함수 테스트', () => {
  const mockPreview: Template = {
    id: 'tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc',
    title: 'OO TV 구매 만족도 조사입니다.',
    description: 'OO TV 구매 만족도 조사입니다. 설문에 응해주시면 서비스를 제공하는데 큰 도움이 됩니다.',
    questions: [
      {
        id: 'qst-97e53695-bf53-4e90-9453-af4f15070155',
        type: 'radio',
        label: '구매하신 고객님의 연령대를 선택해주세요.',
        options: ['20대', '30대', '40대', '50대', '60대 이상'],
        required: true,
      },
      {
        id: 'qst-0a60fa7a-9da2-4346-aafe-235db4aaf2e3',
        type: 'radio',
        label: '서비스 전반에 얼마나 만족하시나요?',
        options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'],
        required: true,
      },
      {
        id: 'qst-0cd5d6d6-de86-4c43-a89a-3c22716b5c1b',
        type: 'text',
        label: '불편하거나 개선이 필요하다고 느낀 점이 있다면 말씀해주세요.',
        required: false,
      },
    ],
    createdAt: '2025-06-16T06:12:55.955Z',
    updatedAt: '2025-06-16T06:13:48.596Z',
  };

  beforeEach(() => {
    localStorage.clear();
  });

  test('저장 후 불러오기', () => {
    updatePreviewTemplate(mockPreview);
    const result = getPreviewTemplate();
    expect(result).toMatchObject(mockPreview);
  });

  test('일부만 업데이트하면 기존 값이 유지됨', () => {
    updatePreviewTemplate(mockPreview);
    updatePreviewTemplate({ title: '수정된 제목' });
    const result = getPreviewTemplate();
    expect(result.title).toBe('수정된 제목');
    expect(result.description).toBe(
      'OO TV 구매 만족도 조사입니다. 설문에 응해주시면 서비스를 제공하는데 큰 도움이 됩니다.',
    );
    expect(result.questions).toEqual(mockPreview.questions);
  });

  test('localStorage에 잘못된 데이터가 있을 때 예외 처리', () => {
    // console.error 감추기
    const originalError = console.error;
    console.error = jest.fn();

    localStorage.setItem('previewTemplate', '잘못된json');
    const result = getPreviewTemplate();
    expect(result).toEqual({});

    console.error = originalError;
  });
});
