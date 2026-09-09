# XULO Syntax Reference

A concise reference for the XULO language syntax. For detailed explanations, see the [official documentation](../content/docs/en/reference/).

## Elements

Uppercase names are components; lower camelCase names are attributes and named values. Structure comes from `{` blocks — no closing tags, no angle brackets.

```js
Component
Component()
Component { ... }
Component(attr: value) { ... }
```

Children belong to the enclosing block:

```js
Screen {
  Header {
    Text("Dashboard")
  }
  Body {
    Text("Content")
  }
}
```

## Attributes

Comma-separated `key: value` pairs inside `(...)`. Keys are lower camelCase.

```js
Button(
  variant: "outline",
  width: "100%",
  height: 48,
  weight: "bold",
  radius: "md"
)
```

The first positional argument is the content/text (implicit parameter):

```js
Text("Hello")
Button("Submit", variant: "primary")
Input("Enter email")
Image("logo.png")
Link("Home")
Field("Email") { Input(placeholder: "you@example.com") }
```

## Values

- **String** — `"..."` or `'...'`, including theme refs `"$theme.text.secondary"`
- **Number** — `400`, `1.5`, `16` (integers and floats unified)
- **Boolean** — `true` / `false`
- **Identifier** — named value or token, e.g. `primary`, `lg`
- **Null** — `null`

## Comments

```js
// Line comment — stripped before rendering
```

---

## Types

### Base Types

```js
string         // String
boolean        // Boolean
list<T>        // Dynamic array (built-in generic)
map<K, V>      // Key-value dictionary (built-in generic)
set<T>         // Set (built-in generic)
object         // Anonymous object literal
null           // Null
T?             // Optional (T | null)
T | U          // Union type
T & U          // Intersection type
```

### Numeric Types

XULO uses a **two-layer** numeric type system:

**User-facing layer** (everyday coding, AI-friendly):

```js
number         // Generic numeric (alias for int | float)
int            // 64-bit signed integer (default for integer literals)
float          // 64-bit double-precision float (default for float literals)
```

**Formal layer** (fixed-bit types for systems/FFI):

```js
i8 / i16 / i32 / i64   // Signed integers
u8 / u16 / u32 / u64   // Unsigned integers
f32 / f64              // Floats
```

```js
let x = 42            // inferred: int
let pi = 3.14         // inferred: float
let w: u32 = 800      // coerced to u32
let opacity: f32 = 0.8 // coerced to f32
```

`View` is a built-in marker type for UI component functions; it has no runtime implementation.

### Type Aliases

```js
type User = {
  name: string
  age: number
  email: string?
}

type Status = "active" | "inactive" | "pending"

type Handler = fn(request: Request): Response

type ApiResponse<T> = {
  data: T?
  error: string?
}
```

### Structs

```js
struct User {
  name: string
  age: number
  email: string?
}

// Creating instances
let user = User(name: "Alice", age: 30, email: "alice@example.com")

// Field access
print(user.name)
user.age = 31  // mutable via `let` binding
```

Struct fields are **private by default**. Use `pub` for public fields:

```js
export struct User {
  pub name: string    // Public
  age: number         // Private
}
```

Batch-public with `export pub struct`:

```js
export pub struct Point {
  x: number   // Automatically pub
  y: number   // Automatically pub
}
```

### Enums

```js
// Simple
enum Theme {
  Light
  Dark
  System
}

// With associated data
enum Operation {
  Success(data: number)
  Error(message: string)
}

enum Action {
  Click
  Submit(data: object)
  Cancel
}

enum Person {
  Nobody
  Named(string, number)  // Multi-parameter payload
}
```

Construction and matching:

```js
let op = Operation.Success(42)

match op {
  Operation.Success(value) => print("Got: " + value)
  Operation.Error(msg) => print("Error: " + msg)
}
```

### Traits

```js
trait Area {
  fn area(self): number
  fn perimeter(self): number
}

impl Area for Rectangle {
  fn area(self): number { self.w * self.h }
  fn perimeter(self): number { 2 * (self.w + self.h) }
}
```

Explicit dispatch (static call, zero overhead):

```js
let r: Rectangle = { w: 3, h: 4 }
print(str(Area.area(r)))        // 12
print(str(Area.perimeter(r)))   // 14
```

Generic constraints:

```js
fn describe<T: Area>(t: T): number {
  Area.area(t)
}
```

---

## Variables

```js
let count = 0                  // Immutable by default
let mut x = 10                 // Explicitly mutable
let name: string = "Alice"     // With type annotation
let maybe: string? = null      // Optional type
```

Assignment requires `let mut`:

```js
let mut x = 10
x = x + 1   // OK

let y = 5
y = 10      // Error
```

---

## Functions

```js
// No return value
fn log(message: string) {
  print(message)
}

// Implicit return (last expression)
fn add(a: number, b: number): number {
  a + b
}

// Explicit return
fn subtract(a: number, b: number): number {
  return a - b
}
```

### Optional & Default Parameters

```js
fn greet(name: string?): string {
  if name != null { "Hello, " + name } else { "Hello, stranger" }
}

fn greet(name: string = "stranger"): string {
  "Hello, " + name
}
```

### Named Parameters

```js
fn Button(label: string, variant: string = "primary"): View

Button(variant: "outline", label: "Submit")  // Out of order OK
```

### Generic Functions

```js
fn first<T>(list: list<T>): T {
  list[0]
}

let n: number = first([1, 2, 3])   // T inferred as number
```

### Closures

```js
let double = fn(x: number): number { x * 2 }

fn makeAdder(n: number): fn(number): number {
  fn(v: number): number { v + n }   // Captures n
}

let add5 = makeAdder(5)
print(str(add5(10)))   // 15

// Async closure
let work = async fn() { 42 }
let v = await work()
```

---

## Control Flow

### `if` Expressions

```js
let max = if a > b { a } else { b }

if condition {
  // ...
} else if other {
  // ...
} else {
  // ...
}
```

### `for` Loops

```js
for item in items {
  print(item)
}

for i in 0..<10 {     // Range: left-closed, right-open
  print(i)
}
```

### `while` Loops

```js
let count = 0
while count < 10 {
  count = count + 1
}
```

### `match`

```js
match value {
  0 => "zero"
  1 => "one"
  _ => "other"
}
```

With enum payloads:

```js
let op = Operation.Success(42)
match op {
  Operation.Success(value) => print("Got: " + value)
  Operation.Error(msg) => print("Error: " + msg)
}
```

### Error Handling: `try` / `catch` / `finally`

```js
try {
  // May throw exceptions
} catch err: SpecificError {
  // Catch specific type
} catch err {
  // Catch all others
} finally {
  // Always executes
}
```

```js
async fn fetchUser(id: string): User {
  try {
    let response = await fetch("/api/users/" + id)
    return await response.json()
  } catch (e) {
    print("Error: " + e.message)
    return null
  }
}
```

Custom exceptions via `enum`:

```js
enum ValidationError {
  FieldRequired(field: string),
  InvalidFormat(field: string, expected: string),
  OutOfRange(field: string, min: number, max: number)
}

throw ValidationError.OutOfRange("age", 0, 150)
```

Built-in exception types: `JSONError`, `FsError`, `NetworkError`, `Error` (base).

---

## Expressions

### Operator Precedence (High → Low)

```text
Postfix            x.y  x[i]  f(x)  x?.y
Unary              !  -  await
Multiply/Divide    *  /
Add/Subtract       +  -
Comparison/Equal   <  >  <=  >=  ==  !=  ..<
Nullish            ??
Logical And        and
Logical Or         or
Ternary            ?:
Assignment         =
```

### Logical & Ternary

```js
let ok = a > 1 and b < 2       // `and` / `or` (not `&&` `||`)
let n = a > 1 ? "big" : "small"
print(!flag)
```

### String Concatenation

```js
print("Hello, " + who + "!")
print("count=" + str(count))    // str(x) converts to string
```

Rules:
- `number + number` → `number`
- `string + string` → `string`
- `list<T> + list<U>` → concatenated list
- Mixed types are prohibited — use `str(x)` first

### Member / Subscript / Optional Chaining

```js
user.name           // Member access
xs[0]               // Subscript
user?.name          // Optional member (null if object is null)
let name = user?.name ?? "anonymous"   // Nullish coalescing
```

### Spread

```js
// List spread
let all = [...head, ...tail]

// Object spread
let copy = { ...base, b: 2 }
```

### `match` as Expression

```js
let label = match status {
  0 => "zero"
  1 => "one"
  _ => "other"
}
```

---

## Memory Access Modifiers

XULO uses **No GC** with ownership and borrowing. Four access forms:

| Syntax | Semantics | Description |
|--------|-----------|-------------|
| `u: T` | Immutable Borrow *(default)* | Shared read-only, zero cost |
| `u: mut T` | Mutable Borrow | Exclusive writable |
| `move expr` | Ownership Transfer | Original variable invalidated |
| `copy expr` | Explicit Deep Copy | Independent clone |

```js
fn inspect(u: User) { print(u.name) }        // Immutable borrow
fn birthday(u: mut User) { u.age += 1 }       // Mutable borrow
fn consume(u: User) { save_to_database(u) }   // Ownership transfer

fn main() {
  let mut alice = User(name: "Alice", age: 30)
  inspect(alice)        // alice still valid
  birthday(mut alice)   // alice still valid
  let bob = copy alice  // alice and bob independent
  consume(move alice)   // alice invalidated
}
```

**Aliasing XOR Mutability**: immutable and mutable borrows cannot coexist in the same scope.

---

## Concurrency

### `spawn` Dispatch Modes

```js
spawn async { do_work() }                    // Lightweight async task (default)
spawn.thread async { compute_heavy() }       // OS physical thread
spawn.process async { run_sandboxed() }      // Independent child process
spawn.on(my_pool) async { handle_request() } // Custom scheduler
```

### `shared` and `lock`

```js
let state = shared AppState { total_online: 0 }

spawn async {
  lock state {
    state.total_online += 1
  }
}
```

### Process Services (Actor Model)

```js
enum Command {
  Analyze(string),
  Shutdown
}

struct WorkerService {
  metrics: Metrics
}

impl WorkerService {
  fn on_message(u: mut self, cmd: Command) {
    match cmd {
      Command.Analyze(data) => { reply(heavy_analysis(data)) }
      Command.Shutdown => { reply(Status.ShuttingDown) }
    }
  }
}

fn main() {
  let worker = spawn.process WorkerService { metrics: Metrics.new() }
  worker.send(Command.Analyze("data"))
}
```

---

## Built-in: JSON

No import required.

```js
// Serialize
let json_str = JSON.stringify({ name: "Alice", age: 30 })

// Deserialize (generic)
let user = JSON.parse<User>(json_str)

// Async parse
let user = await JSON.parse_async<User>(json_str)
```

Throws `JSONError` with variants: `SyntaxError`, `TypeMismatch`, `UnexpectedEof`.

---

## Built-in: Regular Expressions

Literal syntax `/pattern/flags`:

```js
let pattern = /^hello\s+(\w+)/i

// Test
if pattern.test("Hello World") { print("Matched!") }

// Find first match
if let match = email_regex.find(input) {
  print(match.value)       // Full match
  print(match.group(1)!)   // Capture group 1
}

// Find all
let matches = email_regex.find_all(input)

// Replace
let formatted = text.replace(date_regex, "$2/$3/$1")
```

Flags: `i` (case-insensitive), `g` (global), `m` (multiline), `u` (unicode).

---

## Reactive State (UI Components)

Decorators are only valid at the top level of functions returning `View`.

### `@State` — Local State

```js
fn Counter(): View {
  @State let count: number = 0

  VStack {
    Text(str(count))
    Button("Increment", onClick: fn() { count = count + 1 })
  }
}
```

### `@Store` — Global State

```js
fn Home(): View {
  @Store let { user, theme } = useAppStore()
  @Store let { setTheme } = useAppStore()

  VStack {
    Text("User: " + user?.name)
    Button(onClick: fn() { setTheme(Theme.Dark) }) {
      Text("Dark mode")
    }
  }
}
```

### `@Environment` — Injected Values

```js
fn Nav(): View {
  @Environment let router: Router
  router.push("/about")
}
```

### `@Effect` — Side Effects

```js
fn UserProfile(id: string): View {
  @Effect fn() { fetchUser(id) }               // On mount
  @Effect fn() { fetchUser(id) }, [id]          // On dependency change
  @Effect fn() {
    setupSubscription()
    return fn() { cleanupSubscription() }       // Cleanup
  }
}
```

### Two-Way Binding `$`

```js
Input(value: $name)          // Binds to @State variable
Checkbox(checked: $isActive)
```

---

## Module System

### Import

```js
import { add, PI } from "math"
import type { User } from "types"
import * as math from "math"
import "core"
```

### Export

```js
export fn add(a: number, b: number): number { a + b }
export let PI = 3.14
export type User = { name: string }
export enum Status { Active Inactive }

// Re-export
export use { add, PI }
```

### Visibility

| Level | Keyword | Controls |
|-------|---------|----------|
| Module | `export` | Whether declaration is exposed externally |
| Type member | `pub` | Whether field/method is accessible |

```js
export struct User {
  pub name: string     // Public field
  age: number          // Private field
}

impl User {
  pub fn new(name: string, age: number): User { ... }
  fn validate_age(age: number): boolean { ... }  // Private method
}
```

Import resolution:
- Relative paths (`./math`) or local names → `.xulo` files, inlined in bundle
- Other specifiers (`@xulo/ui`) → external packages, ESM `import`
- `import type` is erased at runtime
- No runtime module loader — each file compiles to an IIFE returning an export object

---

## Style Props

Short attribute names for style and layout:

| Attribute | Type | Description | Example |
|-----------|------|-------------|---------|
| `color` | `string` | Text color | `color: "#ff0000"` |
| `bg` | `string` | Background color | `bg: "#1a1a2e"` |
| `bgImage` | `string` | Background image URL | `bgImage: "/img/hero.png"` |
| `border` | `string` | Border color | `border: "#4a90d9"` |
| `size` | `number` | Font size (px) | `size: 16` |
| `weight` | `string` | Font weight | `weight: "bold"` |
| `padding` | `number` | Inner spacing | `padding: 8` |
| `margin` | `number` | Outer spacing | `margin: 4` |
| `width` | `number` | Width | `width: 200` |
| `height` | `number` | Height | `height: 24` |
| `radius` | `number` | Border radius | `radius: 4` |
| `opacity` | `number` | Opacity (0.0–1.0) | `opacity: 0.8` |
| `alignment` | `string` | Cross-axis alignment | `alignment: "center"` |
| `justify` | `string` | Main-axis distribution | `justify: "space-between"` |

Layout size literals: `"fill"` (flex: 1), `"auto"` (content size).

`bg` (color) and `bgImage` (image) are strictly separated — image URLs must use `bgImage`.

---

## Routing

```js
Router {
  Route(path: "/", component: Home)
  Route(path: "/about", component: About)
  Route(path: "/profile/:id", component: Profile)
  Route(path: "*", component: NotFound)
}

Link(to: "/about") {
  Text("About")
}
```

---

## UI Component Patterns

### Conditional Rendering

```js
if isLoggedIn {
  Text("Welcome back!")
} else {
  Button("Sign in")
}
```

### List Rendering

```js
for item in items {
  Text(item.name)
}
```

### Layout Primitives

```js
Screen {
  Header { Text("Title") }
  Body {
    VStack(spacing: 16) {
      HStack(spacing: 8) {
        Fill { Text("Left") }
        Text("Right")
      }
    }
  }
}
```

### Common Components

| Component | Purpose |
|-----------|---------|
| `Screen` | Root container |
| `Header` / `Body` | Semantic page sections |
| `VStack` / `HStack` / `ZStack` | Vertical / horizontal / overlay layout |
| `Fill` | Flex: 1 (fills remaining space) |
| `Center` | Centers children |
| `Spacer` | Empty space |
| `Separator` | Visual divider |
| `ScrollArea` | Scrollable container |
| `Resizable` | Resizable panel split |
| `Text` | Text display |
| `Button` | Interactive button |
| `Input` | Text input |
| `Textarea` | Multi-line input |
| `Checkbox` / `Switch` | Toggle controls |
| `Select` / `Combobox` | Dropdowns |
| `Slider` | Range slider |
| `RadioGroup` | Radio buttons |
| `Field` | Label + input wrapper |
| `InputGroup` | Input with prefix/suffix |
| `Card` | Card container |
| `Table` | Data table |
| `Accordion` / `Collapsible` | Collapsible sections |
| `Dialog` / `Sheet` / `Drawer` | Overlay panels |
| `AlertDialog` | Confirmation dialog |
| `Popover` / `Tooltip` | Floating elements |
| `DropdownMenu` | Context dropdown |
| `Tabs` | Tabbed interface |
| `Breadcrumb` | Breadcrumb trail |
| `Pagination` | Page navigation |
| `NavigationMenu` | Top-level nav |
| `Sidebar` | Side navigation |
| `Link` | Navigation link |
| `Badge` | Status label |
| `Avatar` | User image with fallback |
| `Image` | Image display |
| `Alert` | Callout / alert box |
| `Progress` | Progress bar |
| `Skeleton` | Loading placeholder |
| `Spinner` | Loading indicator |

---

## Standard Library (`std`)

```js
import { HashMap, BTreeMap, HashSet, Deque } from "std/collections"
import { File, Path } from "std/fs"
import { http } from "std/net"
import { sleep, interval } from "std/async"
import { AtomicI64 } from "std/sync"
```

| Module | Contents |
|--------|----------|
| `std/collections` | `HashMap`, `BTreeMap`, `HashSet`, `Deque` |
| `std/fs` | `File`, `Path` |
| `std/net` | `TcpStream`, `TcpListener`, `UdpSocket`, `http.fetch()`, `HttpListener` |
| `std/async` | `sleep(ms)`, `interval(ms)`, `Task`, `channel` |
| `std/thread` | `Builder`, `current` |
| `std/sync` | `AtomicBool`, `AtomicI64`, `Semaphore`, `Barrier` |
| `std/process` | `Command`, `env.args()` |
| `std/math` | `PI`, `E`, `sqrt`, `log`, `random` |
| `std/time` | `Instant`, `Duration`, `DateTime` |

Built-in primitives (`list`, `map`, `set`, `JSON`, `spawn`, `lock`, `shared`) do not require import.
