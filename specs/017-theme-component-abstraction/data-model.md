# Data Model: UI Component Props

## UI Components

### Card

A standardized container for grouped information.

| Prop      | Type                                  | Description                   |
| --------- | ------------------------------------- | ----------------------------- |
| children  | `ReactNode`                           | Content of the card           |
| className | `string`                              | Additional styles             |
| variant   | `'default' \| 'playful' \| 'outline'` | Visual style                  |
| hoverable | `boolean`                             | Whether to show hover effects |

### Badge

A small indicator for tags or status.

| Prop     | Type                                                    | Description   |
| -------- | ------------------------------------------------------- | ------------- |
| children | `ReactNode`                                             | Badge content |
| variant  | `'default' \| 'indigo' \| 'green' \| 'yellow' \| 'red'` | Color theme   |
| size     | `'sm' \| 'md'`                                          | Size variant  |

### Heading

Standardized typography for section titles.

| Prop     | Type               | Description                                 |
| -------- | ------------------ | ------------------------------------------- |
| level    | `1 \| 2 \| 3 \| 4` | Heading level                               |
| children | `ReactNode`        | Text content                                |
| subtitle | `string`           | Optional playful subtitle shown below/above |
| icon     | `LucideIcon`       | Optional icon shown next to title           |
