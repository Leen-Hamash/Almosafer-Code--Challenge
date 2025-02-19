import { act, renderHook } from "@testing-library/react";
import { useTableData } from "../hooks/useTableData";

const initialData = [
  { id: '1', name: 'Item 1' },
  { id: '2', name: 'Item 2' },
];

describe('useTableData', () => {
  it('updates cell value', () => {
    const { result } = renderHook(() => useTableData(initialData));
    
    act(() => {
      result.current.updateCell(0, 'name', 'Updated Item');
    });

    expect(result.current.data[0].name).toBe('Updated Item');
  });
});
