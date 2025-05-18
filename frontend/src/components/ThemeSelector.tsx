import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type ColorTheme = "classic" | "warm" | "mono" | "complementary";

interface ThemeSelectorProps {
  onThemeChange: (theme: ColorTheme) => void;
  currentTheme: ColorTheme;
}

export function ThemeSelector({ onThemeChange, currentTheme }: ThemeSelectorProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6">
      <h3 className="text-sm font-medium mb-2 text-center">Choose a Color Theme</h3>
      <Tabs defaultValue={currentTheme} onValueChange={(value) => onThemeChange(value as ColorTheme)} className="w-full">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="classic" className="relative">
            <span className="sr-only">Classic Blue</span>
            <div className="flex space-x-1 items-center">
              <div className="w-3 h-3 rounded-full bg-classic-primary"></div>
              <div className="w-3 h-3 rounded-full bg-classic-accent"></div>
              <div className="w-3 h-3 rounded-full bg-classic-background border border-gray-200"></div>
            </div>
            {currentTheme === "classic" && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-classic-primary"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="warm" className="relative">
            <span className="sr-only">Warm Neutrals</span>
            <div className="flex space-x-1 items-center">
              <div className="w-3 h-3 rounded-full bg-warm-primary"></div>
              <div className="w-3 h-3 rounded-full bg-warm-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-warm-background border border-gray-200"></div>
            </div>
            {currentTheme === "warm" && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-warm-primary"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="mono" className="relative">
            <span className="sr-only">Monochromatic</span>
            <div className="flex space-x-1 items-center">
              <div className="w-3 h-3 rounded-full bg-mono-primary"></div>
              <div className="w-3 h-3 rounded-full bg-mono-secondary"></div>
              <div className="w-3 h-3 rounded-full bg-mono-background border border-gray-200"></div>
            </div>
            {currentTheme === "mono" && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-mono-primary"></div>
            )}
          </TabsTrigger>
          <TabsTrigger value="complementary" className="relative">
            <span className="sr-only">Complementary</span>
            <div className="flex space-x-1 items-center">
              <div className="w-3 h-3 rounded-full bg-complementary-primary"></div>
              <div className="w-3 h-3 rounded-full bg-complementary-accent"></div>
              <div className="w-3 h-3 rounded-full bg-complementary-background border border-gray-200"></div>
            </div>
            {currentTheme === "complementary" && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-complementary-primary"></div>
            )}
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="grid grid-cols-4 gap-2 mt-2 text-xs text-center">
        <div>Classic Blue</div>
        <div>Warm Neutrals</div>
        <div>Monochromatic</div>
        <div>Complementary</div>
      </div>
    </div>
  );
}