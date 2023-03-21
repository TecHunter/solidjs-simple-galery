import { Center, Grid, GridItem, Image } from "@hope-ui/solid";
import { createSignal } from "solid-js";
import json from './data.json';
const imageRoot = 'https://www.somegalery.com/';
const width = 18;
const imageSquareSize = '160px';
export default function App() {
  const [images, setImages] = createSignal(json);

  return (
    <Center h={"100%"}>
      <Grid templateColumns={`repeat(${width}, 1fr)`} gap="$2">

        <For each={images()}>
          {
            (img) => (<GridItem w={imageSquareSize} h={imageSquareSize}>
              <Image
                boxSize={imageSquareSize}
                src={imageRoot + img}
                alt={img}
                objectFit="cover"
              />
            </GridItem>)
          }
        </For>
      </Grid>
    </Center>
  );
}
