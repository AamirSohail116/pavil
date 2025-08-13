"use client"

import { useLanguage } from "@/contexts/language-context"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function TranslationDebug() {
    const { currentLanguage, translateText } = useLanguage()
    const [testResult, setTestResult] = useState<string>("")

    const testTranslation = async () => {
        const result = await translateText("Hello World")
        setTestResult(result)
    }

    if (process.env.NODE_ENV !== "development") {
        return null
    }

    return (
        <Card className="fixed bottom-4 right-4 w-80 z-50">
            <CardHeader>
                <CardTitle className="text-sm">Translation Debug</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className="text-xs">
                    Current Language: {currentLanguage.name} ({currentLanguage.code})
                </p>
                <Button onClick={testTranslation} size="sm">
                    Test Translation
                </Button>
                {testResult && <p className="text-xs bg-muted p-2 rounded">Result: {testResult}</p>}
            </CardContent>
        </Card>
    )
}
