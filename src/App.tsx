import { Button, Icon, VStack, IconProps, Text, Grid, GridItem, Image, Box, HStack } from "@hope-ui/solid";
import { createSignal, createMemo } from "solid-js";
import json from './data.json';
const imageRoot = 'https://www.somegalery.com/';
const columns = 18;
const rows = 1;
const perRow = columns;
const perPage = rows * perRow;
const imageSquareSize = '160px';
function LeftArrowIcon(props: IconProps) {
  return (
    <Icon color="neutral.700" boxSize="24px" {...props}>
      <path d="M6.85355 3.14645C7.04882 3.34171 7.04882 3.65829 6.85355 3.85355L3.70711 7H12.5C12.7761 7 13 7.22386 13 7.5C13 7.77614 12.7761 8 12.5 8H3.70711L6.85355 11.1464C7.04882 11.3417 7.04882 11.6583 6.85355 11.8536C6.65829 12.0488 6.34171 12.0488 6.14645 11.8536L2.14645 7.85355C1.95118 7.65829 1.95118 7.34171 2.14645 7.14645L6.14645 3.14645C6.34171 2.95118 6.65829 2.95118 6.85355 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </Icon>
  );
}

function RightArrowIcon(props: IconProps) {
  return (
    <Icon color="neutral.700" boxSize="24px" {...props}>
      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path>
    </Icon>
  );
}

export default function App() {
  const [images, setImages] = createSignal(json);
  const [page, setPage] = createSignal(0);

  const fullSize = createMemo(() => images().length);
  const pageStart = createMemo(() => Math.max(0, page() * perPage));
  const pageEnd = createMemo(() => Math.min((page() + 1) * perPage, images().length));
  const hasPrev = createMemo(() => pageStart() > 0);
  const hasNext = createMemo(() => pageEnd() < fullSize());
  const slice = createMemo(() => images().slice(pageStart(), pageEnd()));
  const totalPages = createMemo(() => Math.ceil(fullSize() / perPage));
  const prev = function () {
    if (hasPrev()) setPage(page() - 1);
  }
  const next = function () {
    if (hasNext()) setPage(page() + 1);
  }

  return (

    <VStack spacing="$6">

      <HStack spacing="$4">
        <Button leftIcon={<LeftArrowIcon />} disabled={!hasPrev()} onClick={prev}></Button>
        <Box><Text>{page()} / {totalPages()}</Text></Box>
        <Button rightIcon={<RightArrowIcon />} disabled={!hasNext()} onClick={next}></Button>
      </HStack>
      <Grid templateColumns={`repeat(${perRow}, 1fr)`} gap="$2">

        <For each={slice()}>
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

    </VStack>
  );
}
