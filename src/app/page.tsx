'use client';

import Footer from '@/components/footer.component';
import Header from '@/components/header.component';
import {
    findRandomRecipe,
    findSearchedRecipes,
} from '@/utils/FetchHelpers/recipes.FetchHelpers';
import { apiGet } from '@/utils/handlerHelpers';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
    return (
        <div className="flex flex-nowrap grow min-h-screen mx-4 gap-x-2 flex-col">
            <Header />
            <Footer />
        </div>
    );
}
