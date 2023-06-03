import React, { useCallback, useEffect, useState } from 'react';
import { Pressable } from 'react-native';
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';

export interface GridItem {
  id: string;
  data: any;
}

export interface InteractiveGridProps {
  inputData: GridItem[];
  unselectedRender: (data: any) => JSX.Element;
  selectedRender: (data: any) => JSX.Element;
  unselectedStyle: StyleProp<ViewStyle>;
  selectedStyle: StyleProp<ViewStyle>;
  onSelect: (selectedItems: any[]) => void;
  maxPerRow?: number;
  maxSelect?: number;
  defaultSelectedIds?: string[];
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },
  content: { flexDirection: 'row', width: '100%' },
  contentBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#adadad',
  },
  requiredContentBox: {
    aspectRatio: 1,
  },
  contentBoxSelected: {
    backgroundColor: '#ff6600',
  },
  defaultBoxRender: { color: 'white', fontSize: 20 },
  padBox: { flex: 1, backgroundColor: 'transparent' },
});

const defaultBoxRender = (item: GridItem) => (
  <Text style={styles.defaultBoxRender}>{item.id}</Text>
);

export function InteractiveGrid({
  inputData,
  defaultSelectedIds,
  maxPerRow = 2,
  maxSelect = 1,
  unselectedRender = defaultBoxRender,
  selectedRender = defaultBoxRender,
  unselectedStyle = {},
  selectedStyle = styles.contentBoxSelected,
  onSelect,
}: InteractiveGridProps) {
  const [data, setData] = useState<GridItem[]>(inputData);
  const [selectedIds, setSelectedIds] = useState<string[]>(
    defaultSelectedIds ?? []
  );

  const handleSelectGridItem = useCallback(
    (gridItemId: string) => {
      setSelectedIds((ids: string[]) => {
        const existingIndex = ids.findIndex((id) => id === gridItemId);
        if (existingIndex >= 0) {
          ids.splice(existingIndex, 1);
        } else {
          if (ids.length < maxSelect) {
            ids.push(gridItemId);
          }
        }
        onSelect(ids);
        return [...ids];
      });
    },
    [maxSelect, onSelect]
  );

  useEffect(() => {
    setData(inputData);
  }, [inputData]);

  if (data.length <= 0) return <></>;

  const content: JSX.Element[] = [];
  for (let i = 0; i < data.length; i += maxPerRow) {
    const slice = data.slice(i, i + maxPerRow);
    const row = slice.map((gridItem) => {
      const selected: boolean = selectedIds.includes(gridItem.id);
      return (
        <Pressable
          key={gridItem.id}
          style={[
            styles.contentBox,
            unselectedStyle,
            selected && selectedStyle,
            styles.requiredContentBox,
          ]}
          onPress={() => {
            handleSelectGridItem(gridItem.id);
          }}
        >
          {selected ? selectedRender(gridItem) : unselectedRender(gridItem)}
        </Pressable>
      );
    });
    content.push(
      <View key={i} style={styles.content}>
        {row}
      </View>
    );
  }

  return <View style={styles.container}>{content}</View>;
}
