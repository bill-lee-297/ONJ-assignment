import { getAllTemplates, getTemplates, getTemplate, saveTemplate, deleteTemplate } from '../templates';

import type { Template } from '@/types/templates';

describe('templates db 함수 테스트', () => {
  const mockTemplates: Template[] = [
    {
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
    },
    {
      id: 'tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc2222',
      title: 'OO 냉장고 구매 만족도 조사입니다.',
      description: 'OO 냉장고 구매 만족도 조사입니다. 설문에 응해주시면 서비스를 제공하는데 큰 도움이 됩니다.',
      questions: [
        {
          id: 'qst-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc1111',
          type: 'radio',
          label: '구매하신 고객님의 연령대를 선택해주세요.',
          options: ['20대', '30대', '40대', '50대', '60대 이상'],
          required: true,
        },
        {
          id: 'qst-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc2222',
          type: 'radio',
          label: '서비스 전반에 얼마나 만족하시나요?',
          options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'],
          required: true,
        },
        {
          id: 'qst-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc3333',
          type: 'text',
          label: '불편하거나 개선이 필요하다고 느낀 점이 있다면 말씀해주세요.',
          required: false,
        },
      ],
      createdAt: '2025-06-16T07:12:55.955Z',
      updatedAt: '2025-06-16T07:12:55.955Z',
    },
  ];

  beforeEach(() => {
    localStorage.clear();
  });

  test('템플릿 저장, 조회', () => {
    const result = saveTemplate(mockTemplates);
    expect(result).toBe(true);
    const result2 = getAllTemplates();
    expect(result2).toEqual(mockTemplates);
  });

  test('특정 id로 템플릿 조회', () => {
    const result = saveTemplate(mockTemplates);
    expect(result).toBe(true);
    const result2 = getTemplate('tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc2222');
    expect(result2).toEqual(mockTemplates[1]);
  });

  test('템플릿 키워드 검색', () => {
    const result = saveTemplate(mockTemplates);
    expect(result).toBe(true);
    const result2 = getTemplates('만족도');
    expect(Array.isArray(result2)).toBe(true);
    expect((result2 as Template[]).length).toBe(2);

    const result3 = getTemplates('TV');
    expect(Array.isArray(result3)).toBe(true);
    expect((result3 as Template[]).length).toBe(1);
    expect((result3 as Template[])[0].id).toBe('tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc');
  });

  test('deleteTemplate: 특정 id 삭제', () => {
    const result = saveTemplate(mockTemplates);
    expect(result).toBe(true);
    const result2 = deleteTemplate('tpl-0019fcc9-b9a0-41a9-baa5-7c6bda5236cc2222');
    expect(result2).toBe(true);
    const result3 = getAllTemplates();
    expect(result3).toEqual([mockTemplates[0]]);
  });

  test('localStorage에 잘못된 데이터가 있을 때 예외 처리', () => {
    const originalError = console.error;
    console.error = jest.fn();

    localStorage.setItem('templates', '잘못된json');
    expect(getAllTemplates()).toEqual([]);
    expect(getTemplate('1')).toBeNull();
    expect(getTemplates('')).toBeNull();

    console.error = originalError;
  });
});
