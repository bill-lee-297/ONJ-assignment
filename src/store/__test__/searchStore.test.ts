import { useSearchStore } from '../searchStore';

describe('useSearchStore 상태 및 액션 테스트', () => {
  beforeEach(() => {
    useSearchStore.setState({ searchKeyword: '' });
  });

  test('초기 상태 확인', () => {
    expect(useSearchStore.getState().searchKeyword).toBe('');
  });

  test('검색어 변경', () => {
    useSearchStore.getState().setSearchKeyword('설문');
    expect(useSearchStore.getState().searchKeyword).toBe('설문');
  });

  test('빈 문자열로 변경', () => {
    useSearchStore.getState().setSearchKeyword('검색어');
    useSearchStore.getState().setSearchKeyword('');
    expect(useSearchStore.getState().searchKeyword).toBe('');
  });
});
