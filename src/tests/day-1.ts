import { SantasFavoriteCookies } from "../solutions/day-1";
import { Equal, Expect } from "./type-testing";

type test_0_actual = SantasFavoriteCookies;

type test_0_expected = "ginger-bread" | "chocolate-chip";
type test_0 = Expect<Equal<test_0_actual, test_0_expected>>;
