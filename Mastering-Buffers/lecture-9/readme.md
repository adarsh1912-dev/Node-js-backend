# Buffer, Buffer Pool, Buffer.alloc(), and Buffer.allocUnsafe() in Node.js

## Buffer
A **Buffer** in Node.js is a raw binary data storage, similar to an array of bytes. Buffers are used to handle binary data directly, especially when dealing with streams, files, or network operations. Unlike regular JavaScript arrays, Buffers are not resizable and are optimized for performance.

## Buffer Pool
A **buffer pool** is an internal memory management technique used by Node.js to efficiently allocate and reuse memory for buffers. Instead of allocating new memory for every buffer, Node.js maintains a pool of pre-allocated memory chunks, reducing overhead and improving performance for frequent buffer operations.

## Buffer.alloc(size[, fill[, encoding]])
Creates a new Buffer of the specified size and initializes it with zeros (or a custom value if provided). This method is safe because the memory is cleared before use, preventing accidental exposure of old or sensitive data.

**Example:**
```js
const buf = Buffer.alloc(10); // Creates a buffer of 10 bytes, all set to 0
```

## Buffer.allocUnsafe(size)
Creates a new Buffer of the specified size, but the memory is not initialized. The buffer may contain old or sensitive data left in memory. It is faster than Buffer.alloc() but should be used with caution and only when you plan to overwrite the buffer immediately.

**Example:**
```js
const buf = Buffer.allocUnsafe(10); // Creates a buffer of 10 bytes, memory is not cleared
```

## Summary
- Use `Buffer.alloc()` for safety (zero-filled).
- Use `Buffer.allocUnsafe()` for performance (not zero-filled, use with care).
- Buffers are essential for binary data handling in Node.js.
- Buffer pool improves memory allocation efficiency.
- Conditon for not creating a new buffer in memory buf.byteLength < 8192/2;
- If the buffer pool gets exhausted new one will be created. 