import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
// Remove rehypeRaw if you don’t need raw HTML for safety
import rehypeRaw from "rehype-raw";
import {
  Box,
  Code,
  Heading,
  Text,
  UnorderedList,
  OrderedList,
  IconButton,
  Tooltip,
  useClipboard,
  Flex,
} from "@chakra-ui/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";

const MarkdownRenderer = ({ content }) => {
  const decodedContent = content?.replace(/\\n/g, "\n");

  const CodeBlock = ({ language, children }) => {
    const code = String(children).trim();
    const { hasCopied, onCopy } = useClipboard(code);

    return (
      <Box position="relative" my={4} rounded="md" overflow="hidden">
        <Flex
          justify="flex-end"
          bg="gray.800"
          px={2}
          py={1}
          borderTopRadius="md"
        >
          <Tooltip label={hasCopied ? "Copied!" : "Copy"} closeOnClick={false}>
            <IconButton
              size="sm"
              aria-label="Copy code"
              icon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              onClick={onCopy}
              variant="ghost"
              color="whiteAlpha.900"
              _hover={{ bg: "gray.700" }}
            />
          </Tooltip>
        </Flex>
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            padding: "1rem",
            margin: 0,
            background: "#1e1e1e",
            fontSize: "0.9rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </Box>
    );
  };

  return (
    <Box whiteSpace="pre-wrap">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]} // Remove if not using raw HTML
        components={{
          h1: ({ children }) => (
            <Heading as="h1" size="xl" my={2}>
              {children}
            </Heading>
          ),
          h2: ({ children }) => (
            <Heading as="h2" size="lg" my={2}>
              {children}
            </Heading>
          ),
          p: ({ children }) => (
            <Text as="span" display="block" my={2}>
              {children}
            </Text>
          ),
          ul: ({ children }) => (
            <UnorderedList pl={4} my={2}>
              {children}
            </UnorderedList>
          ),
          ol: ({ children }) => (
            <OrderedList pl={4} my={2}>
              {children}
            </OrderedList>
          ),
          li: ({ children }) => <Box as="li">{children}</Box>,
          strong: ({ children }) => <Text as="strong">{children}</Text>,
          code({ inline, className, children }) {
            const language = className?.replace("language-", "") || "";
            if (inline) {
              return (
                <Code colorScheme="yellow" px={1}>
                  {children}
                </Code>
              );
            }
            return <CodeBlock language={language}>{children}</CodeBlock>;
          },
        }}
      >
        {decodedContent}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
