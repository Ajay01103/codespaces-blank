import React from "react"

import { MARGIN } from "./config"
import Tile from "./tile"
import SortableList from "./index"
import { View } from "react-native"

const tiles = [
  {
    id: "spent",
  },
  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
]

const WidgetList = () => {
  return (
    <View
      style={{
        paddingHorizontal: MARGIN,
        marginBottom: 80,
        marginTop: 20,
      }}
    >
      <SortableList
        editing={true}
        onDragEnd={(positions) => console.log(JSON.stringify(positions, null, 2))}
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id}
          />
        ))}
      </SortableList>
    </View>
  )
}

export default WidgetList
