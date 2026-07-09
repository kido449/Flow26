import React, { useEffect } from "react"
import ReactDOMClient from "react-dom/client"
import { beforeEach, describe, expect, it } from "vitest"
import { AppProvider, isLocale, isRole, useApp } from "./app-context"

// Set up minimal environment needed for React 19 createRoot and act() in Node environment
;(globalThis as unknown as Record<string, unknown>).IS_REACT_ACT_ENVIRONMENT = true

const store: Record<string, string> = {}
const mockLocalStorage = {
  getItem: (key: string) => (key in store ? store[key] : null),
  setItem: (key: string, value: string) => {
    store[key] = value
  },
  removeItem: (key: string) => {
    delete store[key]
  },
  clear: () => {
    for (const key of Object.keys(store)) delete store[key]
  },
}

Object.defineProperty(globalThis, "localStorage", {
  value: mockLocalStorage,
  writable: true,
})

Object.defineProperty(globalThis, "window", {
  value: {
    dispatchEvent: () => {},
    HTMLIFrameElement: class HTMLIFrameElement {},
  },
  writable: true,
})

function createMockContainer() {
  return {
    nodeType: 1,
    tagName: "DIV",
    nodeName: "DIV",
    namespaceURI: "http://www.w3.org/1999/xhtml",
    ownerDocument: null,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown as Element
}

describe("App context state, type guards, and localStorage hydration", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe("isRole() type guard", () => {
    it("returns true for valid Role values ('fan', 'staff', 'command')", () => {
      expect(isRole("fan")).toBe(true)
      expect(isRole("staff")).toBe(true)
      expect(isRole("command")).toBe(true)
    })

    it("returns false for invalid Role values or null", () => {
      expect(isRole(null)).toBe(false)
      expect(isRole("")).toBe(false)
      expect(isRole("admin")).toBe(false)
      expect(isRole("en")).toBe(false)
    })
  })

  describe("isLocale() type guard", () => {
    it("returns true for valid Locale values ('en', 'es', 'fr', 'pt')", () => {
      expect(isLocale("en")).toBe(true)
      expect(isLocale("es")).toBe(true)
      expect(isLocale("fr")).toBe(true)
      expect(isLocale("pt")).toBe(true)
    })

    it("returns false for invalid Locale values or null", () => {
      expect(isLocale(null)).toBe(false)
      expect(isLocale("")).toBe(false)
      expect(isLocale("de")).toBe(false)
      expect(isLocale("fan")).toBe(false)
    })
  })

  describe("AppProvider & useApp()", () => {
    function mountAppProvider() {
      let latestApp: ReturnType<typeof useApp> | null = null

      function Consumer() {
        const app = useApp()
        latestApp = app
        return null
      }

      const container = createMockContainer()
      const root = ReactDOMClient.createRoot(container)

      React.act(() => {
        root.render(
          <AppProvider>
            <Consumer />
          </AppProvider>,
        )
      })

      return {
        getApp: () => {
          if (!latestApp) throw new Error("Consumer did not render")
          return latestApp
        },
      }
    }

    it("defaults to role 'fan' and locale 'en' when localStorage is empty or missing", () => {
      const { getApp } = mountAppProvider()
      const app = getApp()
      expect(app.role).toBe("fan")
      expect(app.locale).toBe("en")
      expect(app.t("more.title")).toBeTruthy()
    })

    it("restores state from valid stored values in localStorage on mount", () => {
      localStorage.setItem("tc.role", "staff")
      localStorage.setItem("tc.locale", "fr")

      const { getApp } = mountAppProvider()
      const app = getApp()
      expect(app.role).toBe("staff")
      expect(app.locale).toBe("fr")
    })

    it("falls back to default role 'fan' and locale 'en' when stored values are invalid", () => {
      localStorage.setItem("tc.role", "invalid_role")
      localStorage.setItem("tc.locale", "invalid_locale")

      const { getApp } = mountAppProvider()
      const app = getApp()
      expect(app.role).toBe("fan")
      expect(app.locale).toBe("en")
    })

    it("updates state and persists to localStorage correctly when setters are called", () => {
      const { getApp } = mountAppProvider()

      React.act(() => {
        getApp().setRole("command")
      })
      expect(getApp().role).toBe("command")
      expect(localStorage.getItem("tc.role")).toBe("command")

      React.act(() => {
        getApp().setLocale("es")
      })
      expect(getApp().locale).toBe("es")
      expect(localStorage.getItem("tc.locale")).toBe("es")
    })

    it("throws an error when useApp() is used outside of AppProvider", () => {
      function BadConsumer() {
        useApp()
        return null
      }

      const container = createMockContainer()
      const root = ReactDOMClient.createRoot(container)

      expect(() => {
        React.act(() => {
          root.render(<BadConsumer />)
        })
      }).toThrow("useApp must be used within AppProvider")
    })
  })
})
