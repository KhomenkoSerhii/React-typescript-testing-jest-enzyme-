import { configure } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import '@testing-library/jest-dom';

configure({ adapter: new EnzymeAdapter() });
